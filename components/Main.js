import * as views from "./views";

export default () => html `
${views["Home"]()}
${views["Bio"]()}
${views["Gallery"]()}
${views["Form"]()}
`;
views[st.view](st);
