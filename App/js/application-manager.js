const { Activation } = Windows.ApplicationModel;
const { Application, Navigation, UI } = WinJS;
const { voiceCommand, launch } = Activation.ActivationKind;

/**
 * This class manages the general app state and has an internal event emitter that can be used to signal 
 * any kind of signar the application may do, I would have loved to extend the class to an EventEmitter
 * but it starts throwing errors, so I'll go the safe way
 * */
class ApplicationManager {

  constructor() {
    this._app = Application;
    this._isFirstActivation = true;

    this._app.onactivated = this.onActivated.bind(this);
    this._app.oncheckpoint = this.onCheckPoint.bind(this);
    this.emitter = new EventEmitter3();
  }

  start() {
    this._app.start();
  }

  onActivated(args) {

    switch (args.detail.kind) {
      case voiceCommand:
        this.onVoiceCommandActivation(args);
        break;
      case launch:
        this.onLaunchActivation(args);
        break;
    }

    if (!args.detail.prelaunchActivated) {
      // TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
      // In that case it would be suspended shortly thereafter.
      // Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
      // should be done here (to avoid doing them in the prelaunch case).
      // Alternatively, this work can be done in a resume or visibilitychanged handler.

      this.emitter.emit('not-prelaunch-activation', args)
    }

    if (this._isFirstActivation) {
      // TODO: The app was activated and had not been running. Do general startup initialization here.
      document.addEventListener("visibilitychange", this.onVisibilityChanged.bind(this));
      // on the first activation and after processing all stuff we navigate to the home route
      this.emitter.emit('first-activation', args);
    }
    this._isFirstActivation = false;
  }

  onVisibilityChanged(args) {
    if (!document.hidden) {
      // TODO: The app just became visible. This may be a good time to refresh the view.
    }
    this.emitter.emit('visibility-changed', args)
  }

  onCheckPoint(args) {
    // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
    // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
    // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    this.emitter.emit('checkpoint', args)
  }

  onVoiceCommandActivation(args) {
    // TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
    // this is a good place to decide whether to populate an input field or choose a different initial view.
    this.emitter.emit('voice-command-activation', args)
  }

  onLaunchActivation(args) {
    // A Launch activation happens when the user launches your app via the tile
    // or invokes a toast notification by clicking or tapping on the body.
    if (args.detail.arguments) {
      // TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
      // to take the user in response to them invoking a toast notification.
    }
    else if (args.detail.previousExecutionState === Activation.ApplicationExecutionState.terminated) {
      // TODO: This application had been suspended and was then terminated to reclaim memory.
      // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
      // Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
    }
    this.emitter.emit('launch-activation', args)
  }
}

export default ApplicationManager;