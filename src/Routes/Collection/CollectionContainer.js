import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
  state = {
    result: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const parsedId = parseInt(id);
    try {
      const { data: result } = await moviesApi.collection(parsedId);
      this.setState({ result });
    } catch {
      this.setState({
        error: "Can't find Collection information."
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { result, loading, error } = this.state;
    return (
      <CollectionPresenter
        result={result}
        loading={loading}
        error={error}
      />
    );
  }
}