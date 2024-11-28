import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeListProvider from "../../api/EmployeListProvider/EmployeListProvider";

const useEmployeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await EmployeListProvider();
            setEmployees(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            if (err.message.includes('Sesión expirada') || err.message.includes('no autorizada')) {
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (term) => {
        const filteredEmployees = employees.filter((employee) =>
            employee.carnet.includes(term)
        );
        setEmployees(filteredEmployees);
    };

    return { employees, setEmployees, loading, error, searchTerm, setSearchTerm, handleSearch };
};

export default useEmployeList;