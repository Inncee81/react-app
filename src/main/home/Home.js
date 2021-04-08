
export const Home = () => {
    return (
        <div className="container">
            <h1 className="mt-5">REACT APP BASE</h1>
            <p className="lead">This app include customs hooks.</p>
            <ul>
                <li>File <b>/jsconfig.json</b> reduce the reference path for import modules</li>
                <li>Directory <b>/src/_/</b> for common elements for the project (components/hooks/services/helpers/others..)</li>
                <li>Directory <b>/src/main/</b> for the tree navegation for project</li>
            </ul>
        </div>
    )
}
