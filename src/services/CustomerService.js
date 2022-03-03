import axios from 'axios';


const API_BASE_URL = "http://3.87.45.131:8080/home/Customers"


class CustomerService{

    getCustomers() {
        return axios.get(API_BASE_URL);
    }

    createCustomer(customer) {
        return axios.post(API_BASE_URL, customer);
    }

    getCustomerId(customerId) {
        return axios.get(API_BASE_URL + '/' + customerId)
    }

    updateCustomer(customer, customerId) {
        return axios.put(API_BASE_URL + '/' + customerId, customer)
    }

    deleteCustomer(customerId) {
        return axios.delete(API_BASE_URL + '/' + customerId)
    }

}
export default new CustomerService()