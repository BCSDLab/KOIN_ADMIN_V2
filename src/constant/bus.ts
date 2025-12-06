export const EXCEL_DOWNLOAD_URL: Record<string, string> = {
  shuttleBus: 'https://stage-static.koreatech.in/excel/shuttle_bus_excel_file.xlsm',
  commutingBus: 'https://stage-static.koreatech.in/excel/commuting_bus_excel_file.xlsm',
  coopShop: 'https://stage-static.koreatech.in/excel/coop_shop_excel_file.xlsx',
};

export type DownloadType = keyof typeof EXCEL_DOWNLOAD_URL;

export const ROUTE_TYPE_COLORS: Record<string, string> = {
  주중: '#ffb443',
  주말: '#34adff',
  순환: '#4ed92c',
};
