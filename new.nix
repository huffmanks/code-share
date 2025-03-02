{ config, ... }:

{
  # Global
  system.defaults.NSGlobalDomain.AppleInterfaceStyle = "Dark";
  system.defaults.NSGlobalDomain.AppleShowAllExtensions = true;
  system.defaults.NSGlobalDomain.AppleActionOnDoubleClick = "Zoom";
  system.defaults.NSGlobalDomain."com.apple.finder.ShowRecentTags" = false;
  system.defaults.NSGlobalDomain."com.apple.trackpad.enableSecondaryClick" = true;
  system.defaults.NSGlobalDomain."com.apple.trackpad.trackpadCornerClickBehavior" = 1;
  system.defaults.NSGlobalDomain."com.apple.mouse.secondaryClickButton" = 2;
  system.defaults.NSGlobalDomain.NSQuitAlwaysKeepsWindows = false;

  # Finder
  system.defaults.finder.AppleShowAllFiles = true;
  system.defaults.finder.AppleShowAllExtensions = true;
  system.defaults.finder._FXSortFoldersFirst = true;
  system.defaults.finder._FXSortFoldersFirstOnDesktop = true;
  system.defaults.finder._FXShowPosixPathInTitle = true;
  system.defaults.finder.FXDefaultSearchScope = "SCcf";
  system.defaults.finder.FXEnableExtensionChangeWarning = false;
  system.defaults.finder.FXPreferredViewStyle = "Nlsv";
  system.defaults.finder.QuitMenuItem = true;
  system.defaults.finder.ShowExternalHardDrivesOnDesktop = false;
  system.defaults.finder.ShowHardDrivesOnDesktop = false;
  system.defaults.finder.ShowMountedServersOnDesktop = false;
  system.defaults.finder.ShowPathbar = true;
  system.defaults.finder.ShowStatusBar = true;
  system.defaults.finder.NewWindowTargetPath = "file:///${HOME}/Downloads";

  # Dock
  system.defaults.dock.tilesize = 64;
  system.defaults.dock.largesize = 16;
  system.defaults.dock.orientation = "right";
  system.defaults.dock.mineffect = "genie";
  system.defaults.dock.minimize-to-application = true;
  system.defaults.dock.autohide = false;
  system.defaults.dock.launchanim = true;
  system.defaults.dock.show-process-indicators = true;
  system.defaults.dock.show-recents = false;

  system.defaults.dock.persistent-apps = [
    "/System/Applications/Utilities/Terminal.app"
    "/System/Applications/System Settings.app"
  ];

  # Desktop & Stage manager
  system.defaults.WindowManager.StandardHideDesktopIcons = false;
  system.defaults.WindowManager.HideDesktop = true;
  system.defaults.WindowManager.EnableStandardClickToShowDesktop = false;
  system.defaults.WindowManager.GloballyEnabled = false;
  system.defaults.spaces.spans-displays = false;

  # Miscellaneous
  security.pam.enableSudoTouchIdAuth = true;
  system.defaults.screencapture.location = "~/Documents/screenshots";
  # Avoid creating .DS_Store files on network or USB volumes
  targets.darwin.defaults."com.apple.desktopservices".DSDontWriteNetworkStores = true;
  targets.darwin.defaults."com.apple.desktopservices".DSDontWriteUSBStores = true;
  # macOS security updates
  system.defaults.CustomUserPreferences."com.apple.SoftwareUpdate".CriticalUpdateInstall = 1;
  # app store updates
  system.defaults.CustomUserPreferences."com.apple.commerce".AutoUpdate = true;

  # Configure List View Columns and Order
  system.activationScripts.postUserActivation.text = ''
    defaults write com.apple.finder StandardViewSettings -dict-add "ListViewSettings" '{
      "columns" = {
        "Name" = { "visible" = true; };
        "Date Modified" = { "visible" = true; };
        "Date Created" = { "visible" = true; };
        "Size" = { "visible" = true; };
        "Kind" = { "visible" = true; };
      };
      "columnOrder" = ("Name", "Date Modified", "Date Created", "Size", "Kind");
      "sortColumn" = "Date Modified";
      "useRelativeDates" = true;
      "calculateAllSizes" = true;
    }';

    # Restart Finder to Apply Changes
    killall Finder || true
  '';

  # Finder sidebar favorites
  system.activationScripts.postUserActivation.text = ''
    # Define the sidebar favorites
    USERNAME=$(whoami)
    USER_HOME="/Users/$USERNAME"

    /usr/libexec/PlistBuddy -c "Delete :systemitems:VolumesList" ~/Library/Preferences/com.apple.sidebarlists.plist 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Delete :favorites:CustomListItems" ~/Library/Preferences/com.apple.sidebarlists.plist 2>/dev/null || true
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems array" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add AirDrop
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:0 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:0:Name string 'AirDrop'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:0:EntryType integer 4" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add Recents
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:1 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:1:Name string 'Recents'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:1:EntryType integer 4" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add Applications
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:2 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:2:Name string 'Applications'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:2:URL string 'file:///Applications/'" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add Desktop
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:3 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:3:Name string 'Desktop'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:3:URL string 'file://$USER_HOME/Desktop/'" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add Documents
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:4 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:4:Name string 'Documents'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:4:URL string 'file://$USER_HOME/Documents/'" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add Downloads
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:5 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:5:Name string 'Downloads'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:5:URL string 'file://$USER_HOME/Downloads/'" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Add User Folder (Dynamic)
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:6 dict" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:6:Name string '$USERNAME'" ~/Library/Preferences/com.apple.sidebarlists.plist
    /usr/libexec/PlistBuddy -c "Add :favorites:CustomListItems:6:URL string 'file://$USER_HOME/'" ~/Library/Preferences/com.apple.sidebarlists.plist

    # Restart Finder to Apply Changes
    killall Finder || true
  '';
}