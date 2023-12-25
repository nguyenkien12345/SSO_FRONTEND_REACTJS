import axios from 'axios';

const options = {
    // Để có thể đính kèm cookie vào trong request header với axios ta sẽ sử dụng withCredentials: true.
    withCredentials: true 
};

const instance = axios.create(options);

// Trước khi gửi request lên server, do something
instance.interceptors.request.use(
    // Thành công (Status code phải là 200 mới chạy vào đây)
    function(config) {
        return config;
    },
    // Thất bại (Status code khác 200 (status code lỗi) mới chạy vào đây)
    function (error) {
        return Promise.reject(error);
    }
);

// Trước khi trả về phản hồi cho người dùng, do something
instance.interceptors.response.use(
    // Thành công (Status code phải là 200 mới chạy vào đây)
    function(response) {
        // Chúng ta sẽ chỉ trả ra cục data trong response thay vì trả toàn bộ response cho người dùng
        return response && response.data ? response.data : response;
    },
    // Thất bại (Status code khác 200 (status code lỗi) mới chạy vào đây)
    function (error) {
        // Chúng ta sẽ đi cấu hình lại error trước khi trả ra cho người dùng
        return error && error.response && error.response.data ? error.response.data : error.response;
    }
);

export default instance;