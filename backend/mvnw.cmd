@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM Begin all REM://DIFFMARK - do not remove // this is used by the Maven Wrapper
@REM Maven Wrapper, version 3.2.0

@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET __MVNW_CMD__=
@SET __MVNW_ERROR__=
@SET __MVNW_PSMODULEP_SAVE=%PSModulePath%
@SET PSModulePath=
@FOR /F "usebackq tokens=1* delims==" %%A IN (`powershell -noprofile "& {[io.file]::ReadAllText('%~f0') -}split ':mvdiffmark' }| %%{ $_.Trim() } ^| ?{ $_ -like 'SET *' }"`) DO @(
    IF /I "%%A"=="SET WRAPPER_URL" (SET WRAPPER_URL=%%B) ELSE (
    IF /I "%%A"=="SET WRAPPER_JAR" (SET WRAPPER_JAR=%%B) ELSE (
    IF /I "%%A"=="SET DIST_URL" (SET DIST_URL=%%B) ELSE (
    IF /I "%%A"=="SET MVN_CMD" (SET MVN_CMD=%%B)
    ))))
@SET PSModulePath=%__MVNW_PSMODULEP_SAVE%

@SET WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"
@SET WRAPPER_PROPERTIES="%~dp0\.mvn\wrapper\maven-wrapper.properties"

@IF NOT EXIST %WRAPPER_JAR% (
    powershell -noprofile -Command "&{"^
        "$webclient = new-object System.Net.WebClient;"^
        "if (-not ([string]::IsNullOrEmpty('%MVNW_USERNAME%') -and [string]::IsNullOrEmpty('%MVNW_PASSWORD%'))) {"^
        "    $webclient.Credentials = new-object System.Net.NetworkCredential('%MVNW_USERNAME%', '%MVNW_PASSWORD%');"^
        "}"^
        "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $webclient.DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%WRAPPER_JAR%')"^
        "}"
    IF %ERRORLEVEL% NEQ 0 (
        echo Failed to download Maven wrapper jar. Please check your network and proxy settings.
        goto end
    )
)

@FOR /F "usebackq tokens=1,2 delims==" %%A IN (%WRAPPER_PROPERTIES%) DO (
    IF "%%A"=="distributionUrl" SET DIST_URL=%%B
)

@IF "%MVNW_VERBOSE%"=="true" (
    echo Wrapper properties: %WRAPPER_PROPERTIES%
    echo   DIST_URL = %DIST_URL%
    echo   WRAPPER_JAR = %WRAPPER_JAR%
)

"%JAVA_HOME%\bin\java.exe" ^
    %MAVEN_OPTS% ^
    %MAVEN_DEBUG_OPTS% ^
    -classpath %WRAPPER_JAR% ^
    "-Dmaven.multiModuleProjectDirectory=%~dp0" ^
    org.apache.maven.wrapper.MavenWrapperMain %*
IF ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%

EXIT /B %ERROR_CODE%
