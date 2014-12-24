﻿
/**
 * This file contains definition extensions to base browser interfaces which are
 * available via third party plug-ins.
 * 
 */

interface Window {

    /**
     * The StatusBar object provides some functions to customize the iOS and Android StatusBar.
     * 
     * http://plugins.cordova.io/#/package/org.apache.cordova.statusbar
     */
    StatusBar: ICordovaStatusBar;

    /**
     * The ProgressIndicator provides some full screen user blocking spinners etc.
     */
    ProgressIndicator: ICordovaProgressIndicator;

    /**
     * Used to obtain a directory entry on the local file system given a URI.
     *
     * Describes the resolveLocalFileSystemURL function that is exposed via the
     * org.apache.cordova.file@1.2.0 plugin in resolveLocalFileSystemURI.js file.
     * 
     * https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md
     * 
     * @param uri The URI of a path on the local file system to use to obtain a directory entry.
     * @param successCallback Executed when the API call succeeds.
     * @param errorCallback Executed when the API call fails.
     */
    resolveLocalFileSystemURL(uri: string, successCallback: (directoryEntry: DirectoryEntry) => void, errorCallback: (error: FileError) => void): void;


    /**
     * The Ripple API for the Apache Ripple Emulator.
     */
    ripple: Object;

    /**
     * Variables emitted at build time which contain useful application information.
     */
    buildVars: {
        /**
         * True if the application was build in debug configuration, false if it was
         * build a release or distribution configuration.
         */
        debug: boolean;

        /**
         * The time at which the application was built.
         */
        buildTimestamp: string;

        majorVersion: number;
        minorVersion: number;
        releaseVersion: number;
        revisionVersion: number
    }
}

