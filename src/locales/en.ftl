## -------- OLD --------
# Errors messages
error-message-common-try-again = Try again
error-message-auth = Your account ({ $username }) does not have permission to use this bot. Please contact administrator.
error-message-auth-empty = Your account does not have permission to use this bot. Please contact administrator.
error-message-auth-admin = Your account ({ $username }) does not have permission to use Admin-panel. Please contact administrator.
error-message-auth-moderator = Your account ({ $username }) does not have permission to use Moderator-panel. Please contact administrator.
error-message-change-gpt-model = You have not selected the GPT model. The current model is { $gptModel }.
error-message-support-gpt-model = The selected GPT model does not support voice input.

# Common buttons
common-button-go-to-chat = Go to chat
common-button-go-back = ⬅️ Go back
common-button-cancel = Cancel
common-button-share = Share

# Start
start-message = Waiting for a text or voice message...

# About
about-message-release = Release: { $release }

# Admin panel
admin-panel-title = Admin-panel of { $botName }.

# Admin menu buttons
admin-menu-button-sessions = Sessions
admin-menu-button-conversations = Conversations
admin-menu-button-users = Users
admin-menu-button-images = Images
admin-menu-button-loggers = Logs
admin-menu-button-csv-reader = CSV Reader
admin-menu-button-go-to-menu = Go to Admin-panel

# Moderator panel
moderator-panel-title = Moderator-panel of { $botName }.

# Moderator menu buttons
moderator-menu-button-sessions = Sessions
moderator-menu-button-users = Users
moderator-menu-button-csv-reader = CSV Reader
moderator-menu-button-go-to-menu = Go to Moderator-panel

# Sessions menu buttons
sessions-menu-button-get = Get session
sessions-menu-button-delete = Delete session

# Session menu messages
sessions-menu-message-delete-success = Session for { $username } has been deleted.

# Conversations menu buttons
conversations-menu-button-get = Get conversation
conversations-menu-button-delete = Delete conversation

# Conversations menu messages
conversations-menu-delete-success = Conversation for { $username } has been deleted.

# User images menu
user-images-menu-button-get = Get images
user-images-menu-button-get-archive = Get the image archive (this will take time)
user-images-menu-button-get-csv = Get CSV file

# Users menu buttons
users-menu-button-get-all = Get all users
users-menu-button-add = Add user
users-menu-button-add-multiple = Add multiple users
users-menu-button-change-role = Change role
users-menu-button-change-limits = Change GPT limits
users-menu-button-block-unblock = Block/Unblock
users-menu-button-delete = Delete user

# Users menu messages
users-menu-message-add-success = User { $username } has been added.
users-menu-message-incorrect = Incorrect username entered. Try again!
users-menu-message-exist = User { $username } was already added.
users-menu-message-block-success = User { $username } has been blocked
users-menu-message-unblock-success = User { $username } has been unblocked
users-menu-message-delete-success = User { $username } has been deleted.
users-menu-message-change-role-success = User { $username } has been given a new role - { $role }.
users-menu-message-enter = Enter user following next format: { $inputFormat }.
users-menu-message-enter-csv = Load a CSV file with the following columns: { $csvFormat }.
users-menu-message-incorrect-csv = The file extension does not match the CSV. Try again!
users-menu-message-multiple-add-success = Users [ { $users } ] were successfully added.
users-menu-message-multiple-add-error = Users have already been added. Try again!
users-menu-message-new-gpt-limits-success =  User { $username } has been given a new GPT limit - { $package }.

# User roles
user-role-super-admin = Super Admin
user-role-admin = Admin
user-role-moderator = Moderator
user-role-user = User

# User statuses
user-status-blocked = Blocked
user-status-available = Available

# User GPT limits packages
user-gpt-limit-base = Base
user-gpt-limit-premium = Premium
user-gpt-limit-vip = VIP
user-gpt-limit-super_vip = Super VIP

# Info messages
info-message-moderator-panel-for-super-admin = Note: Please go to the Admin-panel.
info-message-node-cache = Note: Data caching is set to { $cache } minutes.
info-message-clear-current-session = The current session for the { $username } has been cleared.
info-message-reach-gpt-tokens-limit = You have used all available GPT tokens. Please try again after { $date } { $utc }.
info-message-reach-gpt-images-limit = You have used all available GPT images. Please try again after { $date } { $utc }. 
info-message-conversation-cancel = The data entry has been canceled. Please run the command { $command } again!

# Profile
profile-user-initial-message = Hey 👋, { $firstName } { $lastName }!
profile-user-current-gpt-model = Current GPT model: { $gptModel }
profile-user-role = Your role: { $role }
profile-user-gpt-package = GPT limit: { $package }
profile-user-available-messages-amount = Available number of GPT tokens: { $amount }
profile-user-available-images-amount = Available number of GPT images: { $amount }
profile-user-date-register = Date of registration: { $date } { $utc }

# Image generator
image-generator-enter-request = Enter the query in the following format: { $gptImageQuery }.
image-generator-incorrect-image-number = The number of images entered is incorrect. Try again!

## -------- OLD --------

# Commands
command-profile = Profile
command-image = Generate an image via DALL·E 2
command-restart = New dialog
command-about = About me
command-change-model = Change GPT model
command-support = Write to support

# Description
description-message = Hi there 👋, I'm { $botName }, an intelligent bot capable of responding to various user requests, including voice input. I'm built on various GPT models and have extensive knowledge in various fields such as science, technology, art, sports, healthcare and more. I can answer on questions, help solve problems, and also engage in a casual conversation on any topic. My interface allows both text and voice input.

# Errors messages
error-message-common = Something went wrong. Try again!
error-message-gpt = Your message could not be processed. Try again!

# Auth
auth-authorization = It looks like your account is not authorized. Please click the authorization button.
auth-success = Thank you for authorization! After approval, { $botName } bot will be available to you.
auth-button = Authorization
auth-approval = We are still working on setting up the bot for you. Thank you for your patience!
auth-block = Your account has been blocked.
auth-error = Access is denied.

# Support
support-contact = If you have any questions, click /support.

# Vote
vote-like = 👍
vote-dislike = 👎

# Restart
restart-message = Let's start with a clean slate 😊

# Change GPT model
gpt-model-change-success = The GPT model has been changed: { $prevModel } -> { $currentModel }.
gpt-model-change-title = Select an available GPT model

# Profile
profile-client-initial-message = Hey 👋, { $firstname } { $lastname }!
profile-client-select-model = Selected GPT model:
profile-client-rate = Rate:
profile-client-available-messages = GPT tokens:
profile-client-available-images = GPT images:
profile-client-date-expires = Available tokens will be updated in { $expiresIn } days