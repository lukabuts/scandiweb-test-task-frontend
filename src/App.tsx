import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Loading } from "@/components";
import { NotFound, ProductListPage, ServerError } from "@/pages";
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
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/:category" element={<ProductListPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
