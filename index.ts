import { BaseExternalAccountClient, Compute, Impersonated, JWT, UserRefreshClient } from 'google-auth-library'
import { google, Auth, sheets_v4 } from 'googleapis'
import GetSheetDto from './dtos/get-sheet-dto'

const ACCESSIBLE_SHEETS_IDS: Array<string> = [
  '16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOs', '16ArJIu5hgrCvFG9G5FrG4rLmiB2H9IrXZScV0hMMr68'
]

const sheets: sheets_v4.Sheets = google.sheets('v4');
type ClientType = Compute | JWT | UserRefreshClient | Impersonated | BaseExternalAccountClient

const getGoogleClient = async (): Promise<ClientType> => {
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return await auth.getClient()
}

const getSheets = async (sheetsIds: Array<string>): Promise<Array<object>> => {
  const resultSheets: Array<Promise<object>> = sheetsIds.map(async (sheetId: string): Promise<object> => {
    const request: sheets_v4.Params$Resource$Spreadsheets$Get = {
      spreadsheetId: sheetId
    };
    return new GetSheetDto(await sheets.spreadsheets.get(request))
  })
  const result: Array<object> = []
  for await (const oneSheet of resultSheets) {
    result.push(oneSheet)
  }
  return result
}

const updateSheetsTitle = async (sheetsIds: Array<string>, newTitle: string): Promise<Array<object>> => {
  const resultSheets: Array<Promise<GetSheetDto>> = sheetsIds.map(async (sheetId: string): Promise<GetSheetDto> => {
    const request: sheets_v4.Params$Resource$Spreadsheets$Batchupdate = {
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            updateSpreadsheetProperties: {
              properties: {
                title: newTitle,
              },
              fields: 'title',
            },
          }
        ]
      },
    };
    const response = await sheets.spreadsheets.batchUpdate(request)
    return new GetSheetDto(response)
  })
  const result: Array<object> = []
  for await (const oneSheet of resultSheets) {
    if (oneSheet.status === 200) { oneSheet.title = newTitle }
    result.push(oneSheet)
  }
  return result
}

const start = async (): Promise<void> => {
  try {
    const authClient: ClientType = await getGoogleClient()
    google.options({ auth: authClient })
    const sheets = await getSheets(ACCESSIBLE_SHEETS_IDS)
    console.log(sheets)
    const updatedSheets = await updateSheetsTitle(ACCESSIBLE_SHEETS_IDS, 'title4')
    console.log(updatedSheets)
  } catch (error) {
    console.log(error)
  }
}

start()