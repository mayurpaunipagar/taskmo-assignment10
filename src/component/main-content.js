import MyForm from "./my-form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
export default function MainContent({ blur,setBlur,leadId,setImagePreview }) {
  return (
    <>
      <div className={`main-content ${blur ? "myBlur" : ""}`}>
        
          
            <Route path="/main">
              <MyForm setBlur={setBlur} leadId={leadId} setImagePreview={setImagePreview}/>
            </Route>
          
        
      </div>
    </>
  );
}
