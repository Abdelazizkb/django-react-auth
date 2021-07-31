import React,{useEffect} from 'react'
import NavBar from '../components/NavBar'
import {loadUser} from '../actions/auth'
import {connect} from 'react-redux'

function Layout({children,loadUser}) {

    useEffect(() => {
        const fetchData = async () => {
            try {
              loadUser();
            } catch (err) {

            }
        }

        fetchData();
    }, []);
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default connect(null,{loadUser}) (Layout)
