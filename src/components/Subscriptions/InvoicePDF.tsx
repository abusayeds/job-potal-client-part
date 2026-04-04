import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { getPlanLabel } from "@/lib/getPlanLabel";
import { TPlanName } from "@/types/subscription.type";

export interface InvoiceData {
  _id: string;
  subscriptionId: string;
  createdAt: string | Date;
  planName: TPlanName;
  planPrice: number;
  discount: number;
  signatureName?: string;
  signatureTitle?: string;
  paymentInfo?: {
    bankName?: string;
    cardNumber?: string;
    cardType?: string;
  };
  userId: {
    companyName: string;
    address: string;
  };
}

interface MyDocumentProps {
  data: InvoiceData;
}

// Create styles that exactly match the design
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#000000",
  },

  // Header Section - exact spacing and typography
  header: {
    fontSize: 40,
    fontWeight: "normal",
    letterSpacing: 8,
    marginBottom: 8,
    color: "#000000",
  },
  headerLine: {
    width: "60%",
    height: 0.8,
    backgroundColor: "#000000",
    marginBottom: 45,
  },

  // Invoice Info Section - exact positioning
  invoiceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  invoiceInfoLeft: {
    flexDirection: "column",
    width: "40%",
  },
  invoiceInfoRight: {
    flexDirection: "column",
    width: "40%",
    alignItems: "flex-start",
  },
  infoLabel: {
    fontSize: 10,
    color: "#000000",
    marginBottom: 2,
    fontWeight: "normal",
  },
  infoValue: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 18,
    marginTop: 2,
    color: "#000000",
  },

  // Table Container
  tableContainer: {
    width: "100%",
    marginBottom: 35,
  },

  // Table Header - exact beige color and styling
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#D9CFC0", // More accurate beige color
    border: "1px solid #000000",
    height: 28,
    alignItems: "center",
  },

  // Table Data Rows
  tableRow: {
    flexDirection: "row",
    borderLeft: "1px solid #000000",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000",
    height: 45, // Taller rows to match image
    alignItems: "center",
    // paddingBottom: ""
    backgroundColor: "#FFFFFF",
  },

  // Total Row - darker beige
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#B5A898", // Darker beige for total row
    borderLeft: "1px solid #000000",
    borderRight: "1px solid #000000",
    borderBottom: "1px solid #000000",
    height: 32,
    alignItems: "center",
  },

  // Header Cell Styles - exact column widths
  headerCellNo: {
    width: "6%",
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 4,
    color: "#000000",
  },
  headerCellDescription: {
    width: "48%",
    // textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 8,
    color: "#000000",
  },
  headerCellQty: {
    width: "10%",
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 4,
    color: "#000000",
  },
  headerCellPrice: {
    width: "16%",
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 4,
    color: "#000000",
  },
  headerCellSubtotal: {
    width: "20%",
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold",
    paddingHorizontal: 4,
    color: "#000000",
  },

  // Data Cell Styles - exact positioning
  dataCellNo: {
    width: "6%",
    textAlign: "center",
    fontSize: 10,
    paddingHorizontal: 4,
    color: "#000000",
  },
  dataCellDescription: {
    width: "48%",
    textAlign: "left",
    fontSize: 10,
    paddingLeft: 12,
    color: "#000000",
  },
  dataCellQty: {
    width: "10%",
    textAlign: "center",
    fontSize: 10,
    paddingHorizontal: 4,
    color: "#000000",
  },
  dataCellPrice: {
    width: "16%",
    textAlign: "center",
    fontSize: 10,
    paddingHorizontal: 4,
    color: "#000000",
  },
  dataCellSubtotal: {
    width: "20%",
    textAlign: "center",
    fontSize: 10,
    paddingHorizontal: 4,
    color: "#000000",
  },

  // Total Row Cells
  totalLabelCell: {
    width: "80%",
    textAlign: "right",
    fontSize: 11,
    fontWeight: "bold",
    paddingRight: 12,
    color: "#FFFFFF", // White text on dark background
  },
  totalValueCell: {
    width: "20%",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "bold",
    color: "#FFFFFF", // White text on dark background
  },

  // Payment Information Section
  paymentSection: {
    marginTop: 10,
    marginBottom: 60,
  },
  paymentTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  paymentInfo: {
    fontSize: 10,
    marginBottom: 2,
    color: "#000000",
    lineHeight: 1.3,
  },

  // Signature Section - exact positioning
  signatureContainer: {
    position: "absolute",
    right: 50,
    bottom: 80,
    alignItems: "center",
  },
  signatureName: {
    fontSize: 32,
    fontFamily: "Times-Italic", // More script-like
    marginBottom: 5,
    color: "#000000",
  },
  signatureLine: {
    width: 200,
    height: 0.8,
    backgroundColor: "#000000",
    marginBottom: 8,
  },
  signatureTitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#000000",
    width: 200,
  },
});

// Invoice PDF Document Component
export const MyDocument: React.FC<MyDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View>
        <Text style={styles.header}>INVOICE</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Invoice Information */}
      {/* <View style={styles.invoiceInfoContainer}> */}
      <View style={styles.invoiceInfoLeft}>
        <Text style={styles.infoLabel}>Invoice No:</Text>
        <Text style={styles.infoValue}>{data.subscriptionId.slice(4)}</Text>

        <Text style={styles.infoLabel}>Date Issued:</Text>
        <Text style={styles.infoValue}>
          {new Date(data.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </Text>
      </View>

      <View style={styles.invoiceInfoRight}>
        <Text style={styles.infoLabel}>Issued Company:</Text>
        <Text style={{ ...styles.infoValue, marginBottom: 10 }}>
          {data.userId.companyName}
        </Text>
        <Text
          style={{ ...styles.infoValue, marginBottom: 35, fontWeight: "600" }}
        >
          {data.userId.address}
        </Text>
      </View>
      {/* </View> */}

      {/* Table */}
      <View style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCellNo}>NO</Text>
          <Text style={styles.headerCellDescription}>Subscription</Text>
          <Text style={styles.headerCellPrice}>PRICE</Text>
          <Text style={styles.headerCellPrice}>DISCOUNT</Text>
          <Text style={styles.headerCellSubtotal}>SUBTOTAL</Text>
        </View>

        {/* Table Data Rows */}
        <View style={{ ...styles.tableRow, borderBottom: "none" }}>
          <Text style={styles.dataCellNo}>{1}</Text>
          <Text style={styles.dataCellDescription}>
            {getPlanLabel(data.planName)}
          </Text>
          <Text style={styles.dataCellPrice}>$ {data.planPrice}</Text>
          <Text style={styles.dataCellPrice}>
            $ {data.discount ? data.discount : "00"}
          </Text>
          <Text style={styles.dataCellSubtotal}>
            $ {data.planPrice - (data.discount ?? 0)}
          </Text>
        </View>

        {/* Grand Total Row */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabelCell}>GRAND TOTAL</Text>
          <Text style={styles.totalValueCell}>
            $ {data.planPrice - (data.discount ?? 0)}
          </Text>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Payment Information</Text>
        <Text style={styles.paymentInfo}>
          Bank Name: {data?.paymentInfo?.bankName ?? "N/A"}
        </Text>
        <Text style={styles.paymentInfo}>
          Account/Card No: {data?.paymentInfo?.cardNumber ?? "N/A"}
        </Text>
        <Text style={styles.paymentInfo}>
          Card Type:{" "}
          {data?.paymentInfo?.cardType
            ? data?.paymentInfo?.cardType?.charAt(0).toUpperCase() +
              data?.paymentInfo?.cardType?.slice(1)
            : "N/A"}
        </Text>
      </View>

      {/* Signature - positioned exactly like in image */}
      <View style={styles.signatureContainer}>
        <Text style={styles.signatureName}>
          {data.signatureName || "Claudia"}
        </Text>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureTitle}>
          {data.signatureTitle || "Finance Manager"}
        </Text>
      </View>
    </Page>
  </Document>
);
