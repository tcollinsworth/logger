# The JSON logger we've all wanted but didn't exist

## Goals
- (TBD) uses AsyncLocalStorage to pass context to modules and nested functions to need to pass loggers
- logs all arguments, not purely printf style substitution formatting
- (TBD) logs errors, nested errors, and stacktraces in any argument position, not error first
- introspect all loggers and dynamically set any logger level across all nodes
- (TBD) monitor context values (AsyncLocalStorage) and log on match, i.e., orgId, userId, etc.
- (TBD) microservice friendly - pool aware with dynamic distributed configuration
- develop/debug with colorization and without top level JSON formatting

