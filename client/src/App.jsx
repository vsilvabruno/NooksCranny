import { useState, useEffect } from "react";
import { Route, Switch, useLocation, useRoute } from "wouter";
import { getToken } from "./utils/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/NotFoundView";
import ForbiddenView from "./views/ForbiddenView";
import LoginView from "./views/LoginView";
import CartView from "./views/CartView";
import CheckoutView from "./views/CheckoutView";
import ChooseAuthView from "./views/ChooseAuthView";
import SuccessView from "./views/SuccessView";
import OrderHistoryView from "./views/OrderHistoryView";
import LikedView from "./views/LikedView";
import AboutView from "./views/AboutView";
import AdminView from "./views/AdminView";

import useItemsData from "./hooks/useItemsData";
import useUserData from "./hooks/useUserData";
import useOrdersData from "./hooks/useOrdersData";

import bgImage from "/images/body/bg.jpg";
import './fonts.css';

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get('search') || '';
  const token = getToken();
  const [, setLocation] = useLocation();
  const [isLoginRoute] = useRoute("/login");
  const [isChooseAuthRoute] = useRoute("/cart/choose-auth");

  useEffect(() => {
    if (token && (isLoginRoute || isChooseAuthRoute)) {
      setLocation("/");
    }
  }, [token, isLoginRoute, isChooseAuthRoute]);

  const {
    categories,
    items,
    loadingCategories,
    loadingItems,
    errorItems,
    onCategoryClick,
    fetchItems,
  } = useItemsData(searchTerm);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  const {
    users,
    loadingUsers,
    errorUsers,
    fetchUsers
  } = useUserData();

  const {
    orders,
    loadingOrders,
    errorOrders,
    fetchOrders
  } = useOrdersData();
  
  return (
    <div 
      className="d-flex flex-column min-vh-100 position-relative z-3"
      style={{
        backgroundImage: `url(${bgImage})`, 
        backgroundRepeat: "repeat", 
        backgroundSize: "auto", 
        width: "100%",
        fontFamily: 'nin'
      }}
    >
      <Header searchTerm={searchTerm} />
      <div className="flex-grow-1 px-lg-5 px-md-5 py-4">
        <Switch>
          <Route path="/" component={() => (
            <HomeView
              categories={categories}
              items={items}
              loadingCategories={loadingCategories}
              loadingItems={loadingItems}
              errorItems={errorItems}
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          )} />
          <Route path="/404" component={NotFoundView} />
          <Route path="/login" component={LoginView} />
          <Route path="/cart" component={CartView} />
          <Route path="/cart/checkout" component={CheckoutView} />
          <Route path="/cart/choose-auth" component={ChooseAuthView} />
          <Route path="/cart/success" component={SuccessView} />
          <Route path="/orders" component={OrderHistoryView} />
          <Route path="/liked" component={LikedView} />
          <Route path="/about" component={AboutView} />
          <Route path="/admin/:section?" component={() => {
            const token = getToken();
            let isAdmin = false;

            if (token) {
              try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload && payload.email === 'tomnook@bell.ac') {
                  isAdmin = true;
                }
              } catch (err) {
                console.error("Error decoding the token:", err);
                isAdmin = false;
              }
            }

            return isAdmin
              ? <AdminView
                  items={items}
                  fetchItems={fetchItems}
                  users={users}
                  loadingUsers={loadingUsers}
                  errorUsers={errorUsers}
                  fetchUsers={fetchUsers}
                  orders={orders}
                  loadingOrders={loadingOrders}
                  errorOrders={errorOrders}
                  fetchOrders={fetchOrders}
                />
              : <ForbiddenView />;
          }} />
          <Route path="/403" component={ForbiddenView} />
          <Route component={NotFoundView} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;