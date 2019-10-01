import axios from 'axios';

export const request = (path, opts = {})=> {
    const headers = Object.assign({},
                        opts.headers || {},
                        {'Content-Type': 'application/json',
                        'token': sessionStorage.getItem( 'authToken' ) || localStorage.getItem( 'authToken' ) || ''
                        }
                    );
    return fetch(
        path,
        Object.assign({ method: 'POST',}, opts,{headers}),
    ).then( result => {
      if( result.status === 401 ){
        sessionStorage.setItem( 'authToken' , 'missing' );
        //window.location.assign( '/' );
      }
      return result;
    } );
};

export const axiosRequest = ( path , data ) => {
  return axios.post( path , data , {
      headers:{'token' : sessionStorage.getItem( 'authToken' )}
  });
}
