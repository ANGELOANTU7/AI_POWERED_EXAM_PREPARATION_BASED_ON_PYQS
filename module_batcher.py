import os

# Define the directory where the input file is located
input_directory = ''

# Define the name of the input file
input_file_name = 'cluster_questions.txt'

# Define the full path of the input file
input_file_path = os.path.join(input_directory, input_file_name)

# Open the input file in read mode
with open(input_file_path, 'r') as file:
    # Iterate over each line in the input file
    for line in file:
        try:
            # Split each line into two parts: the topic name and the YouTube link
            topic_name, youtube_link = line.split('\t')

            # Remove any leading or trailing white space from the topic name and YouTube link
            topic_name = topic_name.strip()
            youtube_link = youtube_link.strip()

            # Print out the topic name and YouTube link
            print(f"Topic Name: {topic_name}")
            print(f"YouTube Link: {youtube_link}\n")
        except ValueError:
            print(f"Invalid input format for line: {line}")

