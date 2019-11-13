let pool = null;

const api = {
  query: (query, ...parameters) => {
    let promise = new Promise(function(resolve, reject) {
      pool.query(query, ...parameters, (error, results, fields) => {
        if (error) {
          reject(error);
        }

        resolve(results);
      });
    });

    return promise;
  },
  closeAll: () => {
    pool.end();
  }
};

module.exports = api;
