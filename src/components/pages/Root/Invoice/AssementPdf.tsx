/* eslint-disable jsx-a11y/alt-text */
import { ProjectType } from "@/lib/type/project";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

interface AssementPdfProps {
  project: ProjectType;
  session: any;
  price: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "Ubuntu",
    backgroundColor: "#FFFFFF",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "right",
  },
  section: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    marginBottom: 4,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    padding: 6,
  },
  gridColumn: {
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderBottom: "1px solid #000000",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  summary: {
    marginTop: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTable: {
    marginTop: 16,
  },
  paymentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  paymentCell: {
    textAlign: "right",
  },
  separator: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  contact: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon: {
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    width: 24,
    height: 24,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});

export default function AssementPdf({
  project,
  session,
  price,
}: AssementPdfProps) {
  const tax = ((price || 0) * 11) / 100;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>PLN Haleyora Power</Text>
            <Text>{new Date(project.createdAt).toLocaleDateString()}</Text>
            <Text>Pekanbaru, Riau</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Invoice To:</Text>
          <Text style={styles.text}>{project.name}</Text>
          <Text style={styles.text}>{session?.user?.email}</Text>
          <Text style={styles.text}>{project.phone_number}</Text>
          <Text style={styles.text}>{project.address}</Text>
          <Text style={styles.text}>
            {project.city}, {project.province}
          </Text>
        </View>

        <View style={styles.grid}>
          <Text style={styles.gridColumn}>DESCRIPTION</Text>
          <Text style={styles.gridColumn}>PRICE</Text>
          <Text style={styles.gridColumn}>UNIT</Text>
          <Text style={styles.gridColumn}>TOTAL</Text>
        </View>

        <View style={styles.tableRow}>
          <View style={{ flex: 3 }}>
            <Text style={styles.title}>{project.level} - Asset Management</Text>
            <Text>Lorem ipsum dolor sit amet consectetur</Text>
          </View>
          <Text style={styles.tableCell}>
            Rp {price.toLocaleString("en-En")}
          </Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>
            Rp {price.toLocaleString("en-En")}
          </Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.paymentInfo}>
            <Text style={styles.title}>PAYMENT / METHOD</Text>
            <View style={styles.paymentTable}>
              <View style={styles.paymentRow}>
                <Text>BANK:</Text>
                <Text>BRI</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text>A/N:</Text>
                <Text>Haleyora Power</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text>Account:</Text>
                <Text>089523927152</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={[styles.paymentCell, styles.title]}>PRICING</Text>
            <View style={styles.paymentTable}>
              <View style={styles.paymentRow}>
                <Text>Subtotal:</Text>
                <Text style={styles.paymentCell}>
                  Rp {price.toLocaleString("en-En")}
                </Text>
              </View>
              <View style={styles.paymentRow}>
                <Text>PPN (11%):</Text>
                <Text style={styles.paymentCell}>
                  Rp {tax.toLocaleString("en-En")}
                </Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.paymentRow}>
                <Text style={styles.total}>TOTAL:</Text>
                <Text style={[styles.paymentCell, styles.total]}>
                  Rp {(price + tax).toLocaleString("en-EN")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>TERMS & CONDITION</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus, cumque!
          </Text>
        </View>

        <View style={styles.contact}>
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Text>📞</Text>
            </View>
            <Text>+62 123-123-123</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Text>📧</Text>
            </View>
            <Text>plnhp@gmail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              <Text>📍</Text>
            </View>
            <Text>Riau, Pekanbaru</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
