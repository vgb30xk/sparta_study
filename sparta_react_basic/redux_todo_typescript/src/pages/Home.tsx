import React from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Form from "../components/Form";
import List from "../components/List";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <Header />
      <Form />
      <List />
    </Layout>
  );
};

export default Home;
