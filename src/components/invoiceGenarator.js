import jsPDF from "jspdf";
import "jspdf-autotable";

export default function invoiceGenarator(
  type,
  {
    title,
    customerName,
    tableHead,
    tableBody,
    topRightInfo,
    settings,
    bottomRightContent,
    customerInfo,
    companyInfo,
    bottomLeftContent,
    leftBottomSecondColumnX = 30,
    rightColumnLevelPosition = 30,
  }
) {
  const doc = jsPDF(settings.jsPDF);

  // setting the font size
  doc.setFontSize(settings.fontSize);
  const pageSize = doc.internal.pageSize;

  const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
  const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  let companyPic = companyInfo?.map((pic) => pic?.logo);

  // header content
  const headerContent = () => {
    const img = new Image();
    img.src = companyInfo?.map((pic) => pic?.logo);

    const companyName = [
      {
        value: `Mehmud's Company`,
        style: {
          fontSizeStart: 20,
          fontSizeEnd: 11,
          colorEnd: [128, 128, 128],
        },
      },
    ];

    const companyBoxWidth = pageWidth / 2;

    companyName
      .filter((item) => item?.value)
      .forEach((info) => {
        if (info.style.fontSizeEnd) {
          doc.setFontSize(info.style.fontSizeEnd);
        }
        const contentLines = doc.splitTextToSize(
          info.value,

          companyBoxWidth
        );

        if (companyPic) {
          doc.addImage(img, "PNG", 115, -10, 100, 60);
        } else {
          doc.text(contentLines, pageWidth - 15, 20, {
            align: "right",
          });
        }
      });

    if (title) {
      const TITLE = title.toUpperCase();
      // Set the document font and size to bold
      // doc.setFont("Titillium Web", "bold");
      doc.setFontSize(20);
      doc.setTextColor(0);
      doc.setFont("bold");
      const textWidth =
        (doc.getStringUnitWidth(TITLE) * 14) / doc.internal.scaleFactor;
      const xPos = (pageWidth - textWidth) / 7;
      const yPos = 48;
      doc.text(TITLE, xPos, yPos);
      // doc.text(TITLE, xPos, 50);
      doc.setFontSize(10);
    }
    if (customerName) {
      const TITLE = customerName.toUpperCase();
      // Set the document font and size to bold
      // doc.setFont("Titillium Web", "bold");
      doc.setFontSize(10);
      doc.setTextColor(0);
      doc.setFont("normal");
      const textWidth =
        (doc.getStringUnitWidth(TITLE) * 14) / doc.internal.scaleFactor;
      const xPos = (pageWidth - textWidth) / 7;
      // const yPos = 40;
      // doc.text(TITLE, xPos, yPos);
      doc.text(TITLE, xPos, 54);
      doc.setFontSize(10);
    }
  };
  headerContent();

  //================ top left side info section =====================================

  let customerInfoStartY = title ? 58 : 53;
  const customerBoxWidth = pageWidth / 2 - 50;
  const spacingBetweenItems = 1;
  customerInfo
    ?.filter((info) => info.value)
    ?.forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize ? settings.infoTopFontSize : 8);
      // doc.setFont("Titillium Web", "normal");

      if (info.style?.bold) {
        // doc.setFont("Titillium Web", "bold");
      }
      if (info.style?.fontSize) {
        doc.setFontSize(info.style?.fontSize);
      }
      const contentLines = doc.splitTextToSize(
        `${info.value}`,
        customerBoxWidth
      );
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(contentLines, 14, customerInfoStartY);
      // doc.setFont("Titillium Web", "normal");
      doc.setFontSize(8);
      customerInfoStartY += contentLinesHeight + spacingBetweenItems;
    });

  // top right aside info
  let InvoiceStartY = 45;
  const InvoiceBoxWidth = pageWidth / 2 - 50;
  const spacingBetweenInvoiceItems = 4;
  topRightInfo
    .filter((info) => info.value)
    .forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize ? settings.infoTopFontSize : 8);

      if (info.style?.fontSize) {
        doc.setFontSize(info.style?.fontSize);
      }

      const contentLinesLabel = doc.splitTextToSize(
        `${info.label}`,

        InvoiceBoxWidth
      );
      const ContentLinesValue = doc.splitTextToSize(
        `${info.value}`,
        InvoiceBoxWidth
      );
      const labelHeight = doc.getTextDimensions(contentLinesLabel).h;
      const valueHeight = doc.getTextDimensions(ContentLinesValue).h;

      doc.setFont("helvetica", "bold");
      doc.text(contentLinesLabel, pageWidth - 30 - 55, InvoiceStartY, {
        maxWidth: 40,
      });

      InvoiceStartY += labelHeight;
      doc.setFont("helvetica", "normal");
      doc.text(ContentLinesValue, pageWidth - 30 - 55, InvoiceStartY, {
        maxWidth: 40,
      });
      // doc.text(contentLines, pageWidth - 60, InvoiceStartY, { align: "right" });
      doc.setFontSize(8);
      InvoiceStartY += valueHeight + spacingBetweenInvoiceItems;
    });

  // top right aside info
  const companyInfoArray = [
    {
      value: "Tagline",

      fontWeight: "bold",
    },
    {
      value: "address adress adressssssssss",
    },
  ];

  let coloumnStartY = 45;
  // const coloumnBoxWidth = pageWidth / 2 - 50;
  const spacingBetweenColoumnItems = 1;
  companyInfoArray
    .filter((info) => info.value)
    .forEach((info) => {
      doc.setFontSize(settings.infoTopFontSize ? settings.infoTopFontSize : 8);

      if (info.style?.fontSize) {
        doc.setFontSize(info.style?.fontSize);
      }

      const contentLines = doc.splitTextToSize(
        `${info.value}`,
        // coloumnBoxWidth
        180
      );
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(pageWidth - 43, coloumnStartY, contentLines, { maxWidth: 40 });
      // doc.text(contentLines, pageWidth - 60, InvoiceStartY, { align: "right" });
      doc.setFontSize(8);
      coloumnStartY += contentLinesHeight + spacingBetweenColoumnItems;
    });

  let tableMargin = InvoiceStartY + 10;

  // main table items
  doc.autoTable({
    // startY: Math.max(InvoiceStartY),
    head: [tableHead],
    body: tableBody,

    startY: tableMargin,
    startX: 20,

    styles: {
      fontSize: settings.tableFontSize ? settings.tableFontSize : 10, // Set your desired font size here
    },
  });

  // ====================== bottom left info ===============================
  doc.setFontSize(
    settings.bottomLeftFontSize ? settings.bottomLeftFontSize : 8
  );
  // Calculate Y-coordinate for additional content
  let startYForAdditionalContent = doc.autoTable.previous.finalY + 10;
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  doc.line(
    14,
    doc.autoTable.previous.finalY,
    pageWidth - 14,
    doc.autoTable.previous.finalY
  );

  // left side box width
  const boxWidth = pageWidth / 2 - 10;

  // calculate leftContent abd rightContent height or y coordinate before additional content added
  const leftYBeforeWrite = bottomLeftContent
    .filter((item) => item.value)
    .reduce((total, item) => {
      const contentLines = doc.splitTextToSize(item.value, boxWidth);
      // get contentLines height or y coordinate
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      const spacingBetweenItems = 2;
      return total + contentLinesHeight + spacingBetweenItems;
    }, startYForAdditionalContent);

  const rightYBeforeWrite =
    (bottomRightContent.filter((item) => item.value).length - 1) * 2 +
    startYForAdditionalContent;

  const bigHeight = Math.max(leftYBeforeWrite, rightYBeforeWrite);
  if (bigHeight > pageHeight - 12) {
    // Draw border
    doc.addPage();
    doc.setDrawColor(0);
    doc.setLineWidth(0.1);
    doc.line(14, 40, 200, 40); // Top border

    // startYForAdditionalContent = 10;
    // footerContent();
    startYForAdditionalContent = Math.max(customerInfoStartY, InvoiceStartY);
  }

  const leftColumnX = 14;
  const leftColumn2X = 40;
  let leftColumnY = doc.autoTable.previous.finalY + 40;
  const rightColumnX = pageWidth / 2 + rightColumnLevelPosition;
  const rightColumn2X = pageWidth - 15;
  const rightColumnY = startYForAdditionalContent;

  bottomLeftContent
    .filter((item) => item.value)
    .forEach((item) => {
      const contentLines = doc.splitTextToSize(item.value, boxWidth);
      // get contentLines height or y coordinate
      const contentLinesHeight = doc.getTextDimensions(contentLines).h;
      doc.text(item?.label, leftColumnX, leftColumnY);
      doc.text(contentLines, leftColumn2X, leftColumnY);
      const spacingBetweenItems = 2;
      leftColumnY += contentLinesHeight + spacingBetweenItems;
    });

  // ====================== bottom right info ===============================
  // doc.setFont("Titillium Web", "normal");
  doc.setFontSize(
    settings.bottomRightFontSize ? settings.bottomRightFontSize : 12
  );
  doc.setTextColor(50, 50, 50);
  bottomRightContent
    .filter((item) => Boolean(item.value))
    .forEach((item, index) => {
      const rightColY = rightColumnY + index * 6;
      doc.text(item.label, rightColumnX, rightColY);
      doc.text(item.value, rightColumn2X, rightColY, {
        align: "right",
      });
      if (item.style?.borderTop === true) {
        const borderX = rightColumnX;
        doc.line(borderX, rightColY - 4, pageWidth - 15, rightColY - 4);
      }
    });

  // leftColumnY += 40;
  //======================= Define the footer content=============================
  const footerContent = function () {
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    let marginY = 40;

    // Draw Dashed Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.setLineDash([3, 3], 0); // Dashed line
    doc.line(14, pageHeight - 60, pageWidth - 14, pageHeight - 60); // Line across the page

    // Reset Line Dash
    doc.setLineDash();

    // Left Side: Payment Advice
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT ADVICE", 14, pageHeight - 50);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("To: Orange Demo Co", 14, pageHeight - 40);
    doc.text("23 Main Street", 14, pageHeight - 35);
    doc.text("Central City", 14, pageHeight - 30);
    doc.text("Marineville", 14, pageHeight - 25);
    doc.text("1234", 14, pageHeight - 20);

    // Right Side: Invoice Info
    const rightStartX = pageWidth - 80;

    doc.setFontSize(10);
    doc.text("Customer", rightStartX, pageHeight - 50);
    doc.text("Invoice Number", rightStartX, pageHeight - 45);
    doc.text("Amount Due", rightStartX, pageHeight - 40);
    doc.text("Due Date", rightStartX, pageHeight - 35);
    doc.text("Amount Enclosed", rightStartX, pageHeight - 30);

    // Right Side Values
    const rightValueX = pageWidth - 40;

    doc.text("new", rightValueX, pageHeight - 50);
    doc.text("INV-0045", rightValueX, pageHeight - 45);
    doc.text("2,790.91", rightValueX, pageHeight - 40);
    doc.text("31 Aug 2024", rightValueX, pageHeight - 35);
    doc.text(
      "Enter the amount you are paying above",
      pageWidth - 20,
      pageHeight - 20,
      { align: "right" }
    );
  };

  footerContent();
  if (type === "download") {
    // Download the PDF
    doc.save(`${title}`);
  } else if (type === "print") {
    // Print the PDF
    doc.autoPrint();

    window.open(doc.output("bloburl"), "_blank").print();
  } else {
    return doc.output("blob");
  }
}
