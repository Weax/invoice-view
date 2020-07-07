import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import InvoiceTable from "./components/InvoiceTable";
import { Invoice } from "./types/Invoice";

function App() {
  const [invoicesData, setinvoicesData] = React.useState<Invoice[] | null>(null);

  //get invoices json data from mocked request
  useEffect(() => {
    fetch("https://rivile.lt/invoice-view")
      .then(res => res.json())
      .then(json => setinvoicesData(json.invoices));
  }, []);

  return (
    <Grid
      container
      spacing={0}
      justify="center"
    >      
      <Grid item xs={12} lg={11} style={{ maxWidth: 1900 }} container>      
        {invoicesData ? (
          <InvoiceTable data={invoicesData} />
        ) : (
            <CircularProgress style={{ margin: "auto" }}/>
          )}
      </Grid>
    </Grid>
  );
}

export default App;
