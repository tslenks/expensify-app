/**
 * Higher order components (HOC) :: A component that renders another components
 * so it wrappes components and his advantages are ::
 *  - reusable
 *  - render highjacking
 *  - Prop manipulation
 *  - Abstract state :: more generic
 * 
 * ==> Its s simple function that return a react component  but we can add some controls and genericty inside it
 *  as it will has a component as parameter
 */

 import React from 'react';
 import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1> Info </h1>
        <p> These are infos : {props.info} </p>
    </div>
);

// actually this function is the HOC that returns the component that wrapped a random component
// the goal is that we can change component without changing the content of the admin info
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>These details can be shown only for an admin</p> }
            <WrappedComponent {...props} />
        </div>
    )
};

// We don't put the component like tag but just reference it
const AdminInfo = withAdminWarning(Info);

// Authentification
const requireAuthentification = (WrappedComponent) => {
    return (props) => (
        <div>
            {
                props.isAuthenticated ? ( 
                    <WrappedComponent {...props} /> 
                ) : ( 
                    <p>Need to authenticate before seeing this menu</p> 
                ) }
        </div>
    );
};

const AuthenticateInfo = requireAuthentification(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="These are details "/>, document.getElementById('app'));
ReactDOM.render(<AuthenticateInfo isAuthenticated={true} info="Auhtorized info"/>, document.getElementById('app'));