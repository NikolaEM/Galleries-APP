import * as authSagas from "./auth/saga";
import * as galleriesSagas from "./galleries/saga";

const sagas = { ...authSagas, ...galleriesSagas };

export default sagas;
