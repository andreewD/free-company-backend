enum GenericErrors {
    GEOLOCATION_NO_AVAILABLE = 'Geolocation service is not responding correctly',
    INTERNAL_SERVER_ERROR = 'Something went wrong',
    METHOD_NOT_ALLOWED = 'The requested http method is not supported',
    MISSING_ENTERPRISE_KEY = 'Missing enterprise-key!',
    OIDC_NOT_AVAILABLE = 'OIDC service is not responding correctly',
    OSMR_NOT_AVAILABLE = 'OSMR service is not responding correctly',
    WRONG_ENTERPRISE_KEY = 'The provided enterprise-key is not correct!',
    WRONG_BRANCH_ID = 'The provided branch id is not correct!'
}

export { GenericErrors as GE }
