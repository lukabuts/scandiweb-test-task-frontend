import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Loading, NotificationCard, ScrollToTop } from "@/components";
import {
  NotFound,
  ProductListPage,
  ServerError,
  ProductDetailPage,
} from "@/pages";
import { useCategoryStore } from "@/stores";

function App() {
  const { fetchCategories, loading, error } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) return <Loading />;
  if (error) return <ServerError />;
  return (
    <Router>
      <Header />
      <NotificationCard />
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/:category" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
