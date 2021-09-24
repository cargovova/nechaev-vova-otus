import { BaseExternalAccountClient, Compute, Impersonated, JWT, UserRefreshClient } from 'google-auth-library'
import { google, Auth, sheets_v4 } from 'googleapis'
import GetSheetDto from './dtos/get-sheet-dto'

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
  const args: Array<string> = process.argv.slice(2)
  let spreadsheetIds: Array<string> = []
  let newTitle: string = ''
  if (args[0] === '--help' || args[0] === '-h') {
    console.log("CLI для чтения и изменения названий google таблиц")
    console.log("node tree.ts [-spr id таблицы]")
    console.log("node tree.ts [-spr id таблицы] [-nt новое имя таблицы]")
    console.log('Примеры использования: \n ' +
      'node tree.ts -spr 16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt \n ' +
      'node tree.ts -spr 16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt,16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt \n ' +
      'node tree.ts -spr 16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt -nt newname' +
      'node tree.ts -spr 16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt,16NjI46MLajsBGZuR0Eh8GKzSyYBAJLkEo2tA4SDVdOt -nt newname')
  } else if (args.length) {
    const authClient: ClientType = await getGoogleClient()
    google.options({ auth: authClient })
    switch (args.length) {
      case 2:
        try {
          if (args[1]) {
            spreadsheetIds = args[1]?.split(',')
            const sheets = await getSheets(spreadsheetIds)
            console.log(sheets)
          }
        } catch (error) {
          console.log(error)
        }
        break;
      case 4:
        try {
          if (args[1] && args[0] === '-spr' && args[3] && args[2] === '-nt') {
            spreadsheetIds = args[1]?.split(',')
            newTitle = args[3]
            const updatedSheets = await updateSheetsTitle(spreadsheetIds, newTitle)
            console.log(updatedSheets)
          }
        } catch (error) {
          console.log(error)
        }
        break;
    }
  } else {
    console.log("Аргументы введены не корректно \n Введите 'node tree.ts --help' для справки")
  }
}

start()