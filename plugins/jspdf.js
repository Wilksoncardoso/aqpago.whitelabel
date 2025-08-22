import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default (_, inject) => {
  inject('jsPDF', jsPDF);
};