import invoiceGenarator from "./invoiceGenarator";

// eslint-disable-next-line react/prop-types
const MakePdf = ({ data, type, btnName, title, customerName }) => {
  const tableHead = [
    "id",
    "Currency",
    "File",
    "Title",
    "Brand",
    "Sub Total",
    "Total Amount",
  ];

  // eslint-disable-next-line react/prop-types
  const tableBody = data?.map((item, index) => [
    `${index + 1}`,
    item?.id,
    item?.currencyType,
    item?.filePath,
    item?.title,
    item?.brand,
    item?.subTotal,
    item?.totalAmount,
  ]);

  const topRightInfo = [
    {
      label: "Invoice Date",
      value: ` 26 Aug 2024`,
    },
    {
      label: "Invoice Number",
      value: `INV-0045`,
    },
    {
      label: "Reference",
      value: ` nnnnn`,
    },
  ];

  const settings = {
    jsPDF: {
      // orientation: "landscape",
    },
    tableFontSize: 12,
    infoTopFontSize: 12,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 10,
    footerFontSize: 10,
  };

  const bottomRightContent = [
    {
      label: "Total Amount",
      value: ` 10000`,
    },
    {
      label: "Total Tax (+)",
      value: ` 400`,
    },

    {
      label: "Grand Total",
      value: `10400`,
      style: { borderTop: true },
    },
    {
      label: "Paid Amount (-)",
      value: ` 10400`,
    },
    {
      label: "Due Amount:",
      value: ` 0`,
      style: { borderTop: true },
    },
  ];

  const customerInfo = [];
  const bottomLeftContent = [
    {
      label: "Due Date: ",
      value: " 31 Aug 202",
    },
    {
      label: "Terms",
      value:
        "When paying by cheque, please complete this payment When paying by cheque, please complete this payment",
    },
  ];
  const companyInfo = [
    {
      logo: "https://i.ibb.co/tH91Rd1/omega-Logo-removebg-preview.png",
    },
  ];

  return (
    <div>
      <div className="flex justify-center my-10">
        <button
          onClick={() => {
            invoiceGenarator(type, {
              tableHead,
              tableBody,
              topRightInfo,
              settings,
              title,
              bottomRightContent,
              customerInfo,
              bottomLeftContent,
              companyInfo,
              customerName,
            });
          }}
          className="px-6 py-2 bg-green-500 founded-lg text-white flex ">
          {/* {btnName} */}
          print
        </button>
      </div>
      {/* <table id="my-table" className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">TaxType</th>
            <th className="px-4 py-2">invoiceStatus</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.taxType}</td>
              <td className="border px-4 py-2">{item.invoiceStatus}</td>
              <td className="border px-4 py-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default MakePdf;

// MakePdf
