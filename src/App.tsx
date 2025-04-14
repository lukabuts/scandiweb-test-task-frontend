import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Loading } from "@/components";
import { ProductListPage } from "@/pages";
import { useCategoryStore } from "@/stores";

function App() {
  const { fetchCategories, loading, error } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/:category" element={<ProductListPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
