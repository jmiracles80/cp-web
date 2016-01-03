this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/OLDedit-profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\n  <h5>Oops!</h5>\n  <p>Looks like an error occurred.  Please try again later.</p>\n  <code>\n    {{userProfile.errorMsg}}\n  </code>\n</div>\n\n<!-- Loading state -->\n<div ng-show="userProfile.loading">\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\n  <span>Loading user data...</span>\n</div>\n\n\n<div class="col-md-6">\n  <div class="panel panel-default">\n    <div class="panel-heading">\n      <h4>Edit Profile</h4>\n    </div>\n    <div class="panel-body">\n      <form ng-submit="editUser(userProfile.properties.id)">\n        <div class="control-group form-group col-md-12">\n          <label>Gravatar Url</label>\n          <input type="text" class="form-control" placeholder="https//" ng-model="userProfile.properties.gravatar.url">\n        </div>\n\n        <button type="submit" class="btn btn-lg btn-primary btn-block">\n          <span ng-show="userProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\n          <span ng-show="userProfile.saving">Saving...</span>\n          <span ng-hide="userProfile.saving" class="btn-text">Save</span>\n        </button>\n      </form>\n    </div>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/adminUsers.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- USERS PAGE -->\n<div class="panel panel-default">\n\n  <div class="panel-heading">\n    <h3>User Administration</h3>\n  </div>\n\n  <!-- Error state -->\n  <div ng-show="userList.errorMsg">\n    <h5>Oops!</h5>\n    <p>Looks like an error occurred.  Please try again later.</p>\n    <code>\n      {{userList.errorMsg}}\n    </code>\n  </div>\n\n  <!-- Loading state -->\n  <div ng-show="userList.loading">\n    <span class="overlord-loading-spinner fa fa-spinner"></span>\n    <span>Loading users...</span>\n  </div>\n\n  <!-- Empty state -->\n  <div ng-show="userList.contents.length === 0">\n    <!--\n    Note that this empty state will never actually matter because there\n    will always be at least one user (the currently-logged-in admin).\n    -->\n    <span>No users yet.</span>\n  </div>\n\n  <table class="table" ng-show="!userList.loading && userList.contents.length > 0">\n    <tr>\n      <th></th>\n      <th>id <span class="glyphicon glyphicon-lock gi-075"></th>\n      <th>gravatarURL <span class="glyphicon glyphicon-lock gi-075"></th>\n      <th>username <span class="glyphicon glyphicon-lock gi-075"></th>\n      <th>email <span class="glyphicon glyphicon-lock gi-075"></th>\n      <th>admin</th>\n      <th>banned</th>\n      <th>deleted</th>\n      <th></th>\n      <th></th>\n      <th></th>\n    </tr>\n    <tr ng-repeat="user in userList.contents">\n\n      <td></td>\n      <td> {{user.id}} </td>\n      <td> {{user.gravatarURL}}</td>\n      <td> {{user.username}} </td>\n      <td> {{user.email}} </td>\n      <td> <input type="checkbox" ng-model="user.admin" ng-click="saveAdmin(user.id, user.admin)"> </td>\n      <td> <input type="checkbox" ng-model="user.banned" ng-click="saveBanned(user.id, user.banned)"> </td>\n      <td> <input type="checkbox" ng-model="user.deleted" ng-click="saveDeleted(user.id, user.deleted)"> </td>\n      \n      \n\n  </table>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/edit-profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\n<div class="alert alert-info toggle" ng-show="editProfile.errorMsg">\n  <h5>Oops!</h5>\n  <p>Looks like an error occurred.  </p>\n  <code>\n  {{editProfile.errorMsg}}\n  </code>\n</div>\n<!-- Loading state -->\n<div ng-show="editProfile.loading">\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\n  <span>Loading user data...</span>\n</div>\n<div ng-hide="editProfile.loading || editProfile.error">\n  <h1>{{editProfile.properties.username}} <span class="glyphicon glyphicon-lock gi-05"></span></h1>\n  <h2>{{editProfile.properties.email}} <span class="glyphicon glyphicon-lock gi-05"></span></h2>\n  <div class="col-md-6">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h2>Edit Profile</h2>\n      </div>\n      <div class="panel-body">\n        <form ng-submit="updateProfile()">\n          <div class="control-group form-group col-md-12">\n            <label>Your Gravatar Url</label>\n            <input type="text" class="form-control" name="name" ng-model="editProfile.properties.gravatarURL">\n            <img ng-src="{{editProfile.properties.gravatarURL}}"/>\n          </div>\n          <button type="submit" class="btn btn-lg btn-success btn-block">\n          <span ng-show="editProfile.saving" class="overlord-loading-spinner fa fa-spinner"></span>\n          <span ng-show="editProfile.saving">Saving...</span>\n          <span ng-hide="editProfile.saving" class="btn-text">Save</span>\n          </button>\n        </form>\n      </div>\n    </div>\n    <div class="col-md-offset-3 col-md-4 text-center"><a ng-click="restore()" class="btn btn-primary">Restore Gravatar URL with current email address</a></div>\n  </div>\n  <div class="col-md-6">\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h2>Change Password</h2>\n      </div>\n      <div class="panel-body">\n        <!-- Error state -->\n        <div class="alert alert-info toggle" ng-show="editProfile.changePassword.errorMsg">\n          <h4>Oops!</h4>\n          <code>\n          {{editProfile.changePassword.errorMsg}}\n          </code>\n        </div>\n        <form ng-submit="changeMyPassword()">\n          <div class="control-group form-group col-md-12">\n            <label>Choose a password</label>\n            <input type="password" class="form-control" placeholder="at least 6 characters" name="password" ng-model="editProfile.properties.password" id="password">\n          </div>\n          <div class="control-group form-group col-md-12">\n            <label>Re-enter your password</label>\n            <input type="password" class="form-control" placeholder="one more time" name="confirmation" ng-model="editProfile.properties.confirmPassword">\n          </div>\n          <button type="submit" class="btn btn-lg btn-success btn-block">\n          <span ng-show="changePasswordForm.saving" class="overlord-loading-spinner fa fa-spinner"></span>\n          <span ng-show="changePasswordForm.saving">Saving...</span>\n          <span ng-hide="changePasswordForm.saving" class="btn-text">Save</span>\n          </button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["assets/templates/home.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=" col-md-8 col-md-offset-2">\n  <div class="jumbotron">\n    <h1 class="jumboHeading">Chad\'s Viral Videos Emporium</h1>\n    <h2 class="jumboSubHeading">Viral Videos since 2015</h2>\n    <a href="#/signup" class="btn btn-lg btn-success">Sign up now!</a>\n  </div>\n</div>';

}
return __p
};

this["JST"]["assets/templates/profile.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\n<div class="alert alert-info toggle" ng-show="userProfile.errorMsg">\n  <h5>Oops!</h5>\n  <p>Looks like an error occurred.</p>\n  <code>\n  {{userProfile.errorMsg}}\n  </code>\n</div>\n<!-- Loading state -->\n<div ng-show="userProfile.loading">\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\n  <span>Loading user data...</span>\n</div>\n<div ng-hide="userProfile.loading">\n  <div ng-hide="loading">\n    <div class="col-md-3">\n      <img src={{userProfile.properties.gravatarURL}}/>\n    </div>\n  </div>\n</div>\n<div class="col-md-3" ng-hide="userProfile.noProfile">\n  <h1>{{userProfile.properties.username}}</h1>\n  <h3> <a href="mailto:{{userProfile.properties.email}}">{{userProfile.properties.email}}</a></h3>\n  <div>\n    <a href="#/profile/edit/{{userProfile.properties.id}}" class="btn btn-lg btn-primary">Edit</a>\n    <!-- Hard Delete -->\n     <!--<a ng-click="deleteProfile()" class="btn btn-lg btn-primary btn-danger">Delete</a>--> \n    <!-- Soft Delete -->\n    <a ng-click="removeProfile()" class="btn btn-lg btn-primary btn-danger">Delete</a>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/restore.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- Error state -->\n<div class="alert alert-info toggle" ng-show="restoreForm.errorMsg">\n  <h5>Oops!</h5>\n  <p>Looks like an error occurred.</p>\n  <code>\n    {{restoreForm.errorMsg}}\n  </code>\n</div>\n\n<!-- Loading state -->\n<div ng-show="restoreForm.loading">\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\n  <span>Loading user data...</span>\n</div>\n\n<!-- RESTORE FORM -->\n<form ng-submit="restoreProfile()" id="sign-up-form" class="form-signup" name="restore">\n  <h2 class="form-signin-heading">Restore a Profile</h2>\n  <div class="row">\n    <!-- E M A I L -->\n    <div class="control-group form-group col-md-12">\n      <label>Your email address</label>\n      <input type="email" class="form-control" placeholder="nikola@tesla.com" name="email" ng-model="restoreForm.email" >\n    </div>\n    <!-- P A S S W O R D -->\n    <div class="control-group form-group col-md-12">\n      <label>Password</label>\n      <!-- Added the compareTo directive that compares the passowrds -->\n      <input type="password" class="form-control"  name="password" ng-model="restoreForm.password" id="password">\n    </div>\n  </div>\n  <br/>\n  \n  <button class="btn btn-primary btn-lg btn-block" type="submit">\n  <span ng-show="!restoreForm.loading">Restore Account</span>\n  <span class="overlord-loading-spinner fa fa-spinner" ng-show="restoreForm.loading" ></span>\n  <span ng-show="restoreForm.loading">Preparing your new account...</span>\n  </button>\n\n</form>';

}
return __p
};

this["JST"]["assets/templates/signup.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- SIGNUP FORM -->\n<!-- Error state -->\n<div class="alert alert-info toggle" ng-show="signupForm.errorMsg">\n  <h5>Oops!</h5>\n  <p>Looks like an error occurred.  Please try again later.</p>\n  <code>\n    {{signupForm.errorMsg}}\n  </code>\n</div>\n\n<!-- Loading state -->\n<div ng-show="signupForm.loading">\n  <span class="overlord-loading-spinner fa fa-spinner"></span>\n  <span>Loading user data...</span>\n</div>\n\n<div ng-hide="signupForm.loading">\n<form ng-submit="submitSignupForm()" id="sign-up-form" class="form-signup" name="signup" >\n  <h2 class="form-signin-heading">Create an account</h2>\n  <div class="row">\n    <!-- E M A I L -->\n    <div class="control-group form-group col-md-12"\n      ng-class="{\'has-error\':signup.email.$invalid &&\n      signup.email.$dirty}">\n      <label>Your email address</label>\n      <input type="email" class="form-control" placeholder="nikola@tesla.com" name="email" ng-model="signupForm.email" required >\n      <span class="help-block has-error" ng-if="signup.email.$dirty">\n        <span ng-show="signup.email.$error.required">Email address is required.</span>\n        <span ng-show="signup.email.$error.email">Not a valid email address.</span>\n      </span>\n    </div>\n    <!-- U S E R  N A M E -->\n    <div class="control-group form-group col-md-12"\n      ng-class="{\'has-error\':signup.username.$invalid &&\n      signup.username.$dirty}">\n      <label>Your username</label>\n      <input type="text" class="form-control" placeholder="nikola_tesla" name="username" ng-model="signupForm.username" required>\n      <span class="help-block has-error" ng-if="signup.username.$dirty">\n        <span ng-show="signup.username.$error.required">Username is required.</span>\n      </span>\n      <h1> {{signupForm.username | spaceless}}</h1>\n    </div>\n    <!-- P A S S W O R D -->\n    <div class="control-group form-group col-md-6"\n      ng-class="{\'has-error\':signup.password.$invalid &&\n      signup.password.$dirty}">\n      <label>Password</label>\n      <!-- Added the compareTo directive that compares the passowrds -->\n      <input type="password" class="form-control" placeholder="at least 6 characters" name="password" ng-model="signupForm.password" id="password" required ng-minlength="6" compare-to="signupForm.confirmPassword" >\n      <span class="help-block has-error" ng-if="signup.password.$dirty">\n        <span ng-show="signup.password.$error.required">Password is required.</span>\n        <span ng-show="signup.password.$error.minlength">Password must be at least 6 characters.</span>\n      </span>\n    </div>\n\n    <!-- C O N F I R M  P A S S W O R D -->\n    <div class="control-group form-group col-md-6">\n      <label>Re-enter password</label>\n      <input type="password" class="form-control" placeholder="one more time" name="confirmation" ng-model="signupForm.confirmPassword" required >\n      <span class="help-block has-error" ng-if="signup.confirmation.$dirty">\n        <span ng-show="signup.password.$error.compareTo">Password must match.</span>\n        <span ng-show="signup.confirmation.$error.required">Confirmation password is required.</span>\n      </span>\n    </div>\n  </div>\n  <br/>\n  <!-- Disable signup button until the form has no errors -->\n  <button class="btn btn-primary btn-lg btn-block" type="submit" ng-disabled="signup.$invalid">\n  <span ng-show="!signupForm.loading">Create User Account</span>\n  <span class="overlord-loading-spinner fa fa-spinner" ng-show="signupForm.loading" ></span>\n  <span ng-show="signupForm.loading">Preparing your new account...</span>\n  </button>\n  <span class="col-md-offset-3 col-md-6 text-center"> <a href=\'#/restore\'>restore an account</a> </span>\n</form>\n\n<!-- <div ng-sparkline></div> -->';

}
return __p
};

this["JST"]["assets/templates/videos.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- SUBMIT NEW VIDEO -->\n<section class="the-submit-video-form col-md-4" >\n  <h3>See something missing?</h3>\n  <form ng-submit="submitNewVideo()">\n    <input class="form-control" type="text"\n    ng-model="newVideoTitle" ng-disabled="busySubmittingVideo" name="title"\n    placeholder="e.g. My video title"/>\n    <input class="form-control" type="text" ng-model="newVideoSrc"\n    ng-disabled="busySubmittingVideo" name="src"\n    placeholder="e.g. https://www.youtube.com/embed/Kdgt1ZHkvnM"/>\n    <button class="btn btn-success" type="submit" ng-disabled="busySubmittingVideo">\n    {{busySubmittingVideo?\'Submitting...\':\'Submit Video\'}}\n    <span ng-if="submitVideosError">An error has occurred!</span>\n    </button>\n    <p class="error" ng-if="submitVideosError">Please refresh the page and try again.\n    If that doesn\'t work, call Chad!</p>\n  </form>\n</section>\n<!-- LIST OF VIDEOS -->\n<section class="the-list-of-videos col-md-12">\n  <div class="loading" ng-if="videosLoading">Loading videos...</div>\n  <div ng-if="!videosLoading && videos.length===0 && !submitVideosError">There are no videos, please add one!</div>\n  <ul>\n    <li class="video" ng-repeat="video in videos" ng-if="!videosLoading">\n      <h2>{{video.title}}</h2>\n      <iframe width="640" height="390" ng-src="{{video.src}}" frameborder="0" allowfullscreen>\n      </iframe>\n    </li>\n  </ul>\n</section>';

}
return __p
};