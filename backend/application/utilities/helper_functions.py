def calculate_end_time(start_time, duration):
    # Convert start time and duration to minutes
    start_hour, start_minute = map(int, start_time.split(":"))
    duration_hour, duration_minute = map(int, duration.split(":"))
    start_total_minutes = start_hour * 60 + start_minute
    duration_total_minutes = duration_hour * 60 + duration_minute

    # Calculate end time in minutes
    end_total_minutes = start_total_minutes + duration_total_minutes

    # Convert end time from minutes to hours:minutes format
    end_hour = end_total_minutes // 60
    end_minute = end_total_minutes % 60
    end_time = f"{end_hour:02d}:{end_minute:02d}"

    return end_time


