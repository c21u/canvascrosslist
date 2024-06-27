import loadable from "react-loadable";
import Loading from "./Loading";

export default (opts) =>
  loadable({
    loading: Loading,
    ...opts,
  });
