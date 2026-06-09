import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface CalendarEvent {
  title: string;
  type: string;
  dot: string;
}

export interface CalendarEvents {
  [day: number]: CalendarEvent[];
}

const DEFAULT_EVENTS: CalendarEvents = {
  3:  [{ title: 'React Workshop',  type: 'workshop', dot: '#6366f1' }],
  7:  [{ title: 'Quiz: JS Basics', type: 'quiz',     dot: '#eab308' }],
  12: [{ title: 'Live Session',    type: 'live',     dot: '#22c55e' }],
  15: [{ title: 'Assignment Due',  type: 'deadline', dot: '#ef4444' }],
  19: [{ title: 'Doubt Session',   type: 'session',  dot: '#a855f7' }],
  22: [{ title: 'Module Exam',     type: 'exam',     dot: '#f97316' }],
  27: [{ title: 'Webinar',         type: 'webinar',  dot: '#14b8a6' }],
};

@Component({
  tag: 'lb-calendar',
  styleUrl: 'lb-calendar.css',
  shadow: true,
})
export class LbCalendar {

  /** Pass events as JSON string: '[{"day":3,"title":"...","type":"...","dot":"#hex"}]' */
  @Prop() events: string = '';

  /** Highlight today's date */
  @Prop() highlightToday: boolean = true;

  /** Fires when a date is selected, detail = ISO date string */
  @Event() dateSelected: EventEmitter<string>;

  @State() viewMonth: number;
  @State() viewYear: number;
  @State() selectedDay: number | null = null;
  @State() selectedMonth: number | null = null;
  @State() selectedYear: number | null = null;

  private today = new Date();

  connectedCallback() {
    this.viewMonth = this.today.getMonth();
    this.viewYear  = this.today.getFullYear();
    // Auto-select today
    this.selectedDay   = this.today.getDate();
    this.selectedMonth = this.today.getMonth();
    this.selectedYear  = this.today.getFullYear();
  }

  private getEvents(): CalendarEvents {
    if (!this.events) return DEFAULT_EVENTS;
    try {
      const arr = JSON.parse(this.events) as Array<CalendarEvent & { day: number }>;
      const map: CalendarEvents = {};
      arr.forEach(e => {
        const { day, ...rest } = e;
        map[day] = map[day] ? [...map[day], rest] : [rest];
      });
      return map;
    } catch {
      return DEFAULT_EVENTS;
    }
  }

  private prevMonth() {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear -= 1; }
    else this.viewMonth -= 1;
  }

  private nextMonth() {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear += 1; }
    else this.viewMonth += 1;
  }

  private goToday() {
    this.viewMonth = this.today.getMonth();
    this.viewYear  = this.today.getFullYear();
    this.selectDay(this.today.getDate());
  }

  private selectDay(day: number) {
    this.selectedDay   = day;
    this.selectedMonth = this.viewMonth;
    this.selectedYear  = this.viewYear;
    const iso = new Date(this.viewYear, this.viewMonth, day).toISOString();
    this.dateSelected.emit(iso);
  }

  private isToday(day: number) {
    return (
      this.highlightToday &&
      day === this.today.getDate() &&
      this.viewMonth === this.today.getMonth() &&
      this.viewYear  === this.today.getFullYear()
    );
  }

  private isSelected(day: number) {
    return (
      day === this.selectedDay &&
      this.viewMonth === this.selectedMonth &&
      this.viewYear  === this.selectedYear
    );
  }

  private buildCells() {
    const firstDay    = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const daysInPrev  = new Date(this.viewYear, this.viewMonth, 0).getDate();

    const cells: { day: number; cur: boolean }[] = [];
    for (let i = 0; i < firstDay; i++)
      cells.push({ day: daysInPrev - firstDay + 1 + i, cur: false });
    for (let d = 1; d <= daysInMonth; d++)
      cells.push({ day: d, cur: true });
    const tail = (7 - (cells.length % 7)) % 7;
    for (let i = 1; i <= tail; i++)
      cells.push({ day: i, cur: false });
    return cells;
  }

  render() {
    const eventsMap = this.getEvents();
    const cells  = this.buildCells();
    const weeks: { day: number; cur: boolean }[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const selEvents =
      this.selectedDay !== null &&
      this.selectedMonth === this.viewMonth &&
      this.selectedYear  === this.viewYear
        ? (eventsMap[this.selectedDay] || [])
        : [];

    const selDate = this.selectedDay
      ? new Date(this.selectedYear, this.selectedMonth, this.selectedDay)
      : null;

    return (
      <Host>
        <div class="calendar">

          {/* ── Header ── */}
          <div class="cal-header">
            <button class="nav-btn" onClick={() => this.prevMonth()}>&#8249;</button>
            <div class="month-label">
              <span class="month-name">{MONTHS[this.viewMonth]} {this.viewYear}</span>
              <button class="today-btn" onClick={() => this.goToday()}>Today</button>
            </div>
            <button class="nav-btn" onClick={() => this.nextMonth()}>&#8250;</button>
          </div>

          {/* ── Day labels ── */}
          <div class="day-labels">
            {DAYS.map(d => <span class="day-label">{d}</span>)}
          </div>

          {/* ── Grid ── */}
          <div class="cal-grid">
            {weeks.map(week => (
              <div class="week-row">
                {week.map(cell => {
                  const tod = cell.cur && this.isToday(cell.day);
                  const sel = cell.cur && this.isSelected(cell.day);
                  const hasEv = cell.cur && !!eventsMap[cell.day];
                  const cls = [
                    'cal-cell',
                    !cell.cur ? 'other' : '',
                    tod && !sel ? 'today' : '',
                    sel ? 'selected' : '',
                  ].filter(Boolean).join(' ');

                  return (
                    <button
                      class={cls}
                      disabled={!cell.cur}
                      onClick={() => cell.cur && this.selectDay(cell.day)}
                    >
                      <span class="day-num">{cell.day}</span>
                      {hasEv && <span class="event-dot" style={{ background: sel ? 'rgba(255,255,255,0.7)' : eventsMap[cell.day][0].dot }}></span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ── Footer / Selected info ── */}
          <div class="cal-footer">
            {selDate ? (
              <div>
                <div class="sel-date-label">
                  {selDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                {selEvents.length > 0
                  ? selEvents.map(ev => (
                    <div class="event-row">
                      <span class="event-dot-sm" style={{ background: ev.dot }}></span>
                      <span class="event-title">{ev.title}</span>
                      <span class="event-type">{ev.type}</span>
                    </div>
                  ))
                  : <div class="no-events">No events scheduled</div>
                }
              </div>
            ) : (
              <div class="no-events">Select a date to view events</div>
            )}
          </div>

        </div>
      </Host>
    );
  }
}
