import { sheets_v4 } from 'googleapis'
import { GaxiosResponse } from 'googleapis-common'

export default class GetSheetDto {
  readonly spreadsheetId: string | null | undefined
  readonly status: number
  title: string | null | undefined

  constructor(model: GaxiosResponse<sheets_v4.Schema$Spreadsheet>) {
    this.spreadsheetId = model.data.spreadsheetId
    this.status = model.status
    this.title = model.data.properties?.title
  }
}