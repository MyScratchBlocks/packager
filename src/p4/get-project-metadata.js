import {CannotAccessProjectError} from '../common/errors';
import request from '../common/request';

const getProjectMetadata = async (id) => {
  try {
    const meta = await request({
      url: [
        // Hopefully one of these URLs won't be blocked.
        `https://editor-compiler.onrender.com/api/projects/${id}/meta`,
        `https://editor-compiler.onrender.com/api/projects/${id}/meta`
      ],
      type: 'json'
    });
    return {
      title: meta.title,
      token: meta.project_token
    };
  } catch (e) {
    if (e && e.status === 404) {
      throw new CannotAccessProjectError(`Cannot access project ${id}`);
    }
    throw e;
  }
};

export default getProjectMetadata;
