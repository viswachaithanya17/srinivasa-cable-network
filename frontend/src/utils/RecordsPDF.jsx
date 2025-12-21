import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";

/* =========================
   STYLES
========================= */
const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
    fontSize: 10,
    fontFamily: "Helvetica"
  },

  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 6,
    fontWeight: "bold"
  },

  subtitle: {
    textAlign: "center",
    fontSize: 11,
    marginBottom: 20,
    color: "#555"
  },

  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0
  },

  row: {
    flexDirection: "row"
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2"
  },

  headerCell: {
    padding: 6,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#bfbfbf"
  },

  cell: {
    padding: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d0d0d0"
  },

  alternateRow: {
    backgroundColor: "#fafafa"
  },

  imageWrapper: {
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    width: 35,
    height: 35,
    objectFit: "cover",
    borderRadius: 4
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 9,
    color: "#777"
  }
});

/* =========================
   TABLE HEADER (REUSABLE)
========================= */
const TableHeader = () => (
  <View style={styles.headerRow} fixed>
    <Text style={[styles.headerCell, { width: "8%" }]}>S.No</Text>
    <Text style={[styles.headerCell, { width: "16%" }]}>Name</Text>
    <Text style={[styles.headerCell, { width: "14%" }]}>VC No</Text>
    <Text style={[styles.headerCell, { width: "24%" }]}>Address</Text>
    <Text style={[styles.headerCell, { width: "14%" }]}>Phone</Text>
    <Text style={[styles.headerCell, { width: "24%" }]}>Image</Text>
  </View>
);

/* =========================
   MAIN PDF
========================= */
const RecordsPDF = ({ records }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* TITLE */}
      <Text style={styles.title}>Srinivasa Cable Network</Text>
      <Text style={styles.subtitle}>Customer Records Report</Text>

      {/* TABLE */}
      <View style={styles.table}>
        {/* HEADER (REPEATS ON EACH PAGE) */}
        <TableHeader />

        {/* BODY */}
        {records.map((r, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index % 2 === 0 ? styles.alternateRow : null
            ]}
            wrap={false}
          >
            <Text style={[styles.cell, { width: "8%" }]}>
              {r.serialNo}
            </Text>

            <Text style={[styles.cell, { width: "16%" }]}>
              {r.name}
            </Text>

            <Text style={[styles.cell, { width: "14%" }]}>
              {r.vcNo}
            </Text>

            <Text style={[styles.cell, { width: "24%" }]}>
              {r.address}
            </Text>

            <Text style={[styles.cell, { width: "14%" }]}>
              {r.phone}
            </Text>

            <View style={[styles.cell, styles.imageWrapper, { width: "24%" }]}>
              {r.image ? (
                <Image src={r.image} style={styles.image} />
              ) : (
                <Text style={{ color: "#999" }}>No Image</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* FOOTER */}
      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages} | Srinivasa Cable Network`
        }
        fixed
      />
    </Page>
  </Document>
);

export default RecordsPDF;
