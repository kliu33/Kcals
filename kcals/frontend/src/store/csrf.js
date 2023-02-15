export function storeCSRFToken(response) {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
  
  export async function restoreCSRF() {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    return response;
  }
  
  async function csrfFetch(url, options = {}) {
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there are no headers
    options.headers = options.headers || {};
  
    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json" and the "X-CSRF-Token" header to the value of the 
    // "X-CSRF-Token" cookie
    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] =
        options.headers['Content-Type'] || 'application/json';
      options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token');
    }
  
    // call fetch with the url and the updated options hash
    const res = await fetch(url, options);
  
    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;
  
    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
  }

  export const restoreSession = async () => {
        let res = await fetch('/api/session');
        let token = res.headers.get('X-CSRF-Token');
        sessionStorage.setItem('X-CSRF-Token', token);
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    }
  
  export const csrfAPIFetch = async (url, { data, headers = {}, ...options } = {}) => {
      headers = {
        ...headers,
        'X-CSRF-Token': localStorage.getItem("X-CSRF-Token"),
        'Content-Type': 'application/json'
      };
    
      let response = await fetch(`/api/${url}`, {
        ...options,
        body: JSON.stringify(data),
        headers
      });
      const success = response.ok;
    
      storeCSRFToken(response);
      if (response.headers.get('content-type').includes('application/json')) {
        response = await response.json();
      }
    
      return success ? response : Promise.reject(response);
    };
    

  export default csrfAPIFetch;