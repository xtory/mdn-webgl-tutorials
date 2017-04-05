// Note:
// Adapted from
// https://gist.github.com/electricg/4372563

//
// Constructor.
//
function Stopwatch() {
    //
    var _startTime = 0; // Time of last start / resume. (0 if not running)
    var _baseTime = 0; // Time on the clock when last stopped in milliseconds

    //
    // Properties.
    //
    Object.defineProperty(this, 'isRunning', {
        get: function() { return (_startTime !== 0) ? true: false; }
    });

    Object.defineProperty(this, 'elapsedMilliseconds', {
        //
        get: function() {
            //
            return (
                _baseTime +
                (this.isRunning===true) ? now()-_startTime : 0
            ); 
        }
    });

    //
    // Private methods.
    //
    // var now = function() {
    //     return (new Date()).getTime();
    // };        
    function now() {
        return (new Date()).getTime();
    }

    //
    // Privileged methods.
    //
    // Start or resume
    this.start = function() {
        //_startAt = _startAt ? _startAt : now();
        _startTime = (this.isRunning===true) ? _startTime : now();
    }

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        //_lastDuration = _startAt ? _lastDuration + now() - _startAt : _lastDuration;
        _baseTime = (
            (this.isRunning === true) ?
            _baseTime + (now() - _startTime) :
            _baseTime
        );

        _startTime = 0; // Paused
    }

    // Reset
    this.reset = function() {
        _startTime = 0;
        _baseTime = 0;
    }

    // // Duration
    // this.elapsedMilliseconds = function() {
    //     //
    //     return (
    //         _baseTime +
    //         (this.isRunning===true) ? now()-_startTime : 0
    //     ); 
    // }
}

Object.freeze(Stopwatch);

export { Stopwatch };
