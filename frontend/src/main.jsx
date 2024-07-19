import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Styles/index.css";
import PrivateRoutes from "./components/PrivateRoutes.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import ProfileScreen from "../screens/CustomerDashboard.jsx";
import ProfileServiceScreen from "../screens/ProfileServiceScreen.jsx";
import ViewInquiryAdminScreen from "../screens/ViewInquiryAdminScreen.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";
import AdminDashboard from "../screens/AdminDashboard.jsx";
import AddAppointment from "../screens/AddAppointment.jsx";
import AddRecords from "../screens/AddRecords.jsx";
import RecordList from "../screens/RecordList.jsx"
import AddFeedbackScreen from "../screens/AddFeedbackScreen.jsx";
import EditFeedbackScreen from "../screens/EditFeedbackScreen.jsx";
import ViewFeedbackScreen from "../screens/ViewFeedbackScreen.jsx";
import ViewFeedbackAdmin from "../screens/ViewFeedbackAdmin.jsx";
import AddLubricant from "../screens/AddLubricant.jsx";
import ViewLubricant from "../screens/ViewLubricant.jsx";
import AddInquiryScreen from "../screens/AddInquiryScreen.jsx";
import EditInquiryScreen from "../screens/EditInquiryScreen.jsx";
import ViewInquiryScreen from "../screens/ViewInquiryScreen.jsx";
import View from "../screens/ViewOrder.jsx";
import AddEquipment from "../screens/AddEquipment.jsx";
import ViewEquipment from "../screens/ViewEquipment.jsx";
import CustomerAppointments from "../screens/CustomerAppointments.jsx";
import ViewAppN from "../screens/NewViewApp.jsx";
import AddOrder from "../screens/AddOrder.jsx";
import ViewCusOrders from "../screens/ViewCusOrder.jsx";
import AddDelivery from "../screens/AddDelivery.jsx";
import ViewDelivery from "../screens/ViewDelivery.jsx";
import ViewCusDelivery from "../screens/ViewCusDelivery.jsx";
import AddPayment from "../screens/AddPayment.jsx";
import ViewPayment from "../screens/viewPayment.jsx";
import ViewCusPayments from "../screens/ViewCustomerPayment.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='/payment/add' element={<AddPayment />} />
      <Route path='/payment/view' element={<ViewPayment />} />
      <Route path='/payment/cus' element={<ViewCusPayments />} />

      {/* Tharindu routes */}
      <Route path='/listlubricant/add' element={<AddLubricant />} />
      <Route path='/listlubricant/view' element={<ViewLubricant />} />

      {/*shaini routes */}
      <Route path='/inquire' element={<AddInquiryScreen />} />
      <Route path='/editinquire' element={<EditInquiryScreen />} />
      <Route path='/viewinquire' element={<ViewInquiryScreen />} exact="true" />
      <Route path='/ViewInquiryAdmin' element={<ViewInquiryAdminScreen />} exact="true" />

      {/* sumeth routes */}
      <Route path="/orders/add" element={<AddOrder />} />
      <Route path="/orders/View" element={<View />} />
      <Route path="/orders/cus" element={<ViewCusOrders />} />
      <Route path="/delivery/View" element={<ViewDelivery />} />
      <Route path="/delivery/Add" element={<AddDelivery />} />
      <Route path="/delivery/cus" element={<ViewCusDelivery />} />

      {/* sewmini routes */}
      <Route path='/addfeedback' element={<AddFeedbackScreen />} />
      <Route path='/editfeedback' element={<EditFeedbackScreen />} />
      <Route path='/viewfeedback' element={<ViewFeedbackScreen />} />
      <Route path='/viewfeedbackadmin' element={<ViewFeedbackAdmin />} />



      {/* Private routes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<ProfileScreen />} />

      </Route>

      <Route path="/service" element={<ProfileServiceScreen />} />


      {/* keshika routes */}
      <Route path="/admin/equipments/" element={<ViewEquipment />} />


      <Route path='/admin/records/add' element={<AddRecords />} />
      <Route path='/admin/equipments/add' element={<AddEquipment />} />
      <Route path='/admin/records/list' element={<RecordList />} />



      {/* lakshitha routes */}
      <Route path="/app/addapp" element={<AddAppointment />} />
      <Route path="/app/cus" element={<CustomerAppointments />} />

      <Route path="/app/viewn" element={<ViewAppN />} />


      {/* Admin routes */}
      <Route path='' element={<AdminRoutes />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
