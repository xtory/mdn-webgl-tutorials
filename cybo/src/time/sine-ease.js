import { EaseMode }   from './ease-mode';
import { Stopwatch }  from './stopwatch';
import { MathHelper } from '../math/helpers/math-helper';

//
// Constructor.
//
function SineEase(_easeMode, _duration, _isLooped) {
    //
    var _startAngle;
    var _finishAngle;
    var _stopwatch;

    switch (_easeMode)
    {
        case EaseMode.EASE_IN: {
            //
            _startAngle  = -MathHelper.PI_OVER_TWO;
            _finishAngle =  0;
            break;
        }

        case EaseMode.EASE_OUT: {
            //
            _startAngle  = 0;
            _finishAngle = MathHelper.PI_OVER_TWO;
            break;
        }

        case EaseMode.EASE_IN_OUT: {
            //
            _startAngle  = -MathHelper.PI_OVER_TWO;
            _finishAngle =  MathHelper.PI_OVER_TWO;
            break;
        }

        default: {
            throw 'A not-supported exception raised.';
        }
    }

    // Creates the stopwatch. But don't start it immediately.
    _stopwatch = new Stopwatch();

    //
    // Properties.
    //
    Object.defineProperty(this, 'easeMode', {
        get: function() { return _easeMode; }
    });

    Object.defineProperty(this, 'duration', {
        get: function() { return _duration; }
    });

    Object.defineProperty(this, 'sineOfStartAngle', {
        get: function() { return Math.sin(_startAngle); }
    });

    Object.defineProperty(this, 'sineOfCurrentAngle', {
        //
        get: function() {
            //
            var angleOffset = _finishAngle - _startAngle;

            return Math.sin (
                _startAngle +
                angleOffset * this.ratioOfCurrentToTotalTimeOffset
            );
        }
    });

    Object.defineProperty(this, 'sineOfFinishAngle', {
        get: function() { return Math.sin(_finishAngle); }
    });

    /// <summary>
    /// Ratio of 'current time offset' to 'total time offset (that is, the
    /// duration)'. For instance, the current time offset = 500 (in milli-
    /// seconds), the duration = 2000 (in milliseconds) => Ratio = 500 / 2000
    /// = 0.25
    /// </summary>
    Object.defineProperty(this, 'ratioOfCurrentToTotalTimeOffset', {
        //
        get: function() {
            //
            if (_isLooped === false) {
                //
                if (this.isFinished === true) {
                    return 1;
                } else { // this.isFinished === false
                    return _stopwatch.elapsedMilliseconds / _duration;
                }

            } else { // _isLooped === true
                //
                var elapsedMilliseconds =
                    _stopwatch.elapsedMilliseconds % _duration;

                return elapsedMilliseconds / _duration;
            }
        }
    });

    /// <summary>
    /// Ratio of 'current sine-of-angle offset' to 'total sine-of-angle offset'.
    /// For instance, the current sine-of-angle offset = 0.125, the total sine-
    /// of-angle offset = 1 => Ratio = 0.125 / 1 = 0.125
    /// </summary>
    Object.defineProperty(this, 'ratioOfCurrentToTotalSineOfAngleOffset', {
        //
        get: function() {
            //
            var currentSineOfAngleOffset =
                this.sineOfCurrentAngle - this.sineOfStartAngle;

            var totalSineOfAngleOffset =
                this.sineOfFinishAngle - this.sineOfStartAngle;

            return currentSineOfAngleOffset / totalSineOfAngleOffset;
        }
    });

    Object.defineProperty(this, 'isRunning', {
        get: function() { return _stopwatch.isRunning; }
    });

    Object.defineProperty(this, 'isFinished', {
        //
        get: function() {
            //
            if (_isLooped === true) {
                return false;
            }

            var isFinished = (
                (_duration <= _stopwatch.elapsedMilliseconds) ?
                true :
                false
            );

            if (isFinished === true) {
                _stopwatch.stop();
            }

            return isFinished;
        }
    });

    //
    // Privileged methods.
    //
    this.start = function() {
        //
        if (_stopwatch.isRunning === true) {
            return;
        }

        _stopwatch.start();
    }

    this.pause = function() {
        //
        if (_stopwatch.isRunning === false) {
            return;
        }

        // Note:
        // Stopwatch's stop() is like media player's pause(). After calling
        // Stopwatch's start(), the playing continues.

        _stopwatch.stop();
    }

    this.resume = function() {
        //
        if (_stopwatch.isRunning === true) {
            return;
        }

        _stopwatch.start();
    }

    this.stop = function() {
        //
        // Note:
        // Stopwatch's reset() is like media player's stop(). After calling
        // Stopwatch.reset(), everything resets, and this is what we want for
        // SineEase's stop().

        _stopwatch.reset();
    }
}

Object.freeze(SineEase);

export { SineEase };
