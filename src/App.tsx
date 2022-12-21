import { ColorModeContext, ColorModeProvider } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import Dashboard from './scenes/dashboard';
import Sidebar from './scenes/global/Sidebar'
import { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Bar from "./scenes/bar";

const App = () => {

  const ctxColor = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={ctxColor!.theme} >
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <TopBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/geography" element={<Geography />} />
            <Route path='/bar' element={<Bar />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
