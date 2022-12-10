export const clear = (obj: object) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) delete obj[key];
    });
    return obj;
  };
  