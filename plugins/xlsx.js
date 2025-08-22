import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default (context, inject) => {
  inject('XLSX', XLSX);
  inject('saveAs', saveAs);
}