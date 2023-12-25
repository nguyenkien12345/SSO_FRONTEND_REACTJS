import Header from "./components/Header/Header"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleActionGetAccount } from './redux/actions/accountAction'
import HashLoader from 'react-spinners/HashLoader'

function App() {

  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

  const userInfo = useSelector(state => state.account.userInfo);
  const isLoading = useSelector(state => state.account.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fix lỗi mỗi lẩn refresh trang là mất thông tin người dùng
    if(userInfo && !userInfo.access_token) {
      dispatch(handleActionGetAccount());
    }
  }, []);

  return (
    <>
      {
        isLoading ?
        (
          <div style={style}>
            <HashLoader color={"#36d7b7"} loading={true} size={150} />
          </div>
        )        
        :
        (        
          <div className="App">
            <Header/>
          </div>
        )
      }
    </>
  );
}

export default App;
