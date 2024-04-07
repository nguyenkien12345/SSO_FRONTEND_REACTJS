import { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleActionLogin } from '../../redux/actions/accountAction'

function CodeSSO() {
    const [searchParams, setSearchParams] = useSearchParams();
    // Chúng ta sẽ khắc phục lỗi render 2 lần mà React.StrictMode gây ra bằng useRef (Tuyệt đối không tắt React.StrictMode trong index.js)
    // Mỗi khi ta modify giá trị của biến ref thì nó sẽ không bị rerender lại
    const firstRunRef = useRef(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Khi chúng ta sử dụng redux, 1 khi mà giá trị của biến mà chúng ta lấy từ bên trong con redux ra mà nó thay đổi thì nó 
    // sẽ rerender lại component của chúng ta
    const userInfo = useSelector(state => state.account.userInfo);
    const errorMsg = useSelector(state => state.account.errorMsg);
    
    useEffect(() => {
        // Get the ssoToken information returned from redirectUrl
        const ssoToken = searchParams.get('ssoToken');
        if(ssoToken && firstRunRef.current === false) {
            firstRunRef.current = true;
            dispatch(handleActionLogin(ssoToken));
        }
    }, []);


    // Đối với các biến mà chúng ta lấy ra từ redux thì nên đưa vào useEffect để xử lý (Quan sát sự thay đổi của biến)
    useEffect(() => {
        if(userInfo && userInfo.access_token && userInfo.refresh_token) {
            navigate('/');
        }
    }, [userInfo]);

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                {
                    errorMsg &&
                    <div className='alert alert-danger'>
                        <p>
                        Vui lòng đăng nhập lại. Click vào &nbsp; 
                        <a href={`${process.env.REACT_APP_BACKEND_SSO_LOGIN}?redirectUrl=${process.env.REACT_APP_SERVICE_URL}`}>đây</a>
                        </p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CodeSSO