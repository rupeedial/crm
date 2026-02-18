protected function schedule(Schedule $schedule)
{
    $schedule->command('sla:check')->everyFiveMinutes();
}
