import jsPDF from "jspdf";
import "jspdf-autotable";

interface Service {
  description: string;
  hours: number;
  rate: number;
  amount?: number; // Allow amount to be optional
}

interface Booking {
  orderId: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  companyName: string;
  userAddress: string;
  customerPhone: string;
  userEmail: string;
  services: Service[];
  subtotal: number;
  vatPercent: number;
  totalPaid: number;
  thumbnail?: string;
  warehouseName: string;
  startDate: string;
  endDate: string;
  duration: string;
  warehouseAddress: string;
  gst: number;
  sellOrRent: string;
  orderDate: string;
}

export const generateInvoice = (booking: Booking) => {
  const doc = new jsPDF();
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  // Add header design with professional style
  doc.addImage("Rectangle 32.png", "PNG", 0, 0, 210, 5);
  doc.addImage("Rectangle 31.png", "PNG", 50, 0, 210, 5);

  // Company logo
  doc.addImage("logo1.png", "PNG", 20, 15, 40, 15); // Adjusted logo size for professional balance

  // Invoice title and details
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text(`INVOICE`, 150, 20);
  doc.setFont("Helvetica", "semi-Bold");
  doc.setFontSize(18);
  doc.setTextColor(169, 169, 169);
  doc.text(`#${booking.orderId || "N/A"}`, 150, 32);

  doc.setFontSize(14);
  doc.setTextColor(169, 169, 169);
  doc.text(`Invoice Date: ${formatDate(booking.orderDate || "N/A")}`, 20, 35);

  // Billed By, Billed To, and Info Section
  const colWidth = 60;
  function wrapText(
    text: string,
    x: number,
    y: number,
    maxWidth: number
  ): number {
    doc.text(text, x, y, { maxWidth: maxWidth });
    return y + 10 * Math.ceil(doc.getTextDimensions(text).h / 10);
  }

  let yPosition = 55;
  yPosition = wrapText("Billed By:", 20, yPosition, colWidth);
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  yPosition = wrapText("Bookwarehouse", 20, yPosition, colWidth);
  doc.setFontSize(12);
  doc.setTextColor(169, 169, 169);
  yPosition = wrapText(
    "55 W 39th St, New York, NY 10018, United States",
    20,
    yPosition,
    colWidth
  );

  yPosition = 55;
  yPosition = wrapText("Billed To:", 20 + colWidth + 10, yPosition, colWidth);
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  yPosition = wrapText(
    booking.customerName || "N/A",
    20 + colWidth + 10,
    yPosition,
    colWidth
  );
  doc.setFontSize(12);
  doc.setTextColor(169, 169, 169);
  yPosition = wrapText(
    booking.userAddress || "N/A",
    20 + colWidth + 10,
    yPosition,
    colWidth
  );

  yPosition = 55;
  yPosition = wrapText("INFO:", 15 + 2 * (colWidth + 10), yPosition, colWidth);
  doc.setFontSize(12);
  doc.setTextColor(169, 169, 169);
  yPosition = wrapText(
    "Customer Phone:",
    15 + 2 * (colWidth + 10),
    yPosition,
    colWidth
  );
  yPosition = wrapText(
    booking.customerPhone || "N/A",
    15 + 2 * (colWidth + 10),
    yPosition - 5,
    colWidth
  );
  yPosition = wrapText(
    "Sell/Rent:",
    15 + 2 * (colWidth + 10),
    yPosition,
    colWidth
  );
  yPosition = wrapText(
    booking.sellOrRent || "N/A",
    15 + 2 * (colWidth + 10),
    yPosition - 5,
    colWidth
  );

  // Table for booking details with borders for better structure
  const tableColumns = [
    "Start Date",
    "End Date",
    "Duration",
    "Warehouse Name",
    "Warehouse Address",
  ];
  const tableRows = [
    [
      booking.startDate || "N/A",
      booking.endDate || "N/A",
      booking.duration || "N/A",
      booking.warehouseName || "N/A",
      booking.warehouseAddress || "N/A",
    ],
  ];

  (doc as any).autoTable({
    startY: yPosition + 10,
    head: [tableColumns],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [71, 163, 116],
      fontSize: 12,
      textColor: [255, 255, 255],
    },
    styles: { cellPadding: 4, fontSize: 10, cellWidth: "auto" },
    columnStyles: { 0: { halign: "center" }, 1: { halign: "center" } },
  });

  // Display Subtotal, GST, and Total with enhanced design
  let finalY = (doc as any).lastAutoTable.finalY + 10;

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Subtotal:", 120, finalY);
  doc.setFont("Helvetica", "normal");
  doc.text(`Rs.${(booking.subtotal || 0).toFixed(2)}`, 150, finalY);

  doc.text("GST:", 120, finalY + 10);
  doc.text(`Rs.${(booking.gst || 0).toFixed(2)}`, 150, finalY + 10);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Total:", 120, finalY + 20);
  doc.text(`Rs.${(booking.totalPaid || 0).toFixed(2)}`, 150, finalY + 20);

  // Footer Section with professional signature area
  doc.setFontSize(10);
  doc.text("Thank you for your business.", 20, finalY + 40);

  const bottomY = finalY + 60;
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Mr. Rajesh Kumar", 140, bottomY);
  doc.setFontSize(14);
  doc.text("Authorised Signature", 143, bottomY + 10);
  doc.setFontSize(12);
  doc.setTextColor(169, 169, 169);
  doc.text("Bookmywarehouse PVT LTD", 135, bottomY + 20);

  // Add footer design
  const pageHeight = doc.internal.pageSize.height;
  doc.addImage("Rectangle 32.png", "PNG", 0, pageHeight - 5, 210, 5);
  doc.addImage("Rectangle 33.png", "PNG", -50, pageHeight - 5, 210, 5);

  // Save the PDF
  doc.save(`Booking_Invoice_${booking.orderId || "N/A"}.pdf`);
};
