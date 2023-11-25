package com.example.demo.model;

public enum TaskStatus {
	UNTOUCHED(0, "未着手"),
	WORKING(1, "作業中"),
	HOLD(2, "保留"),
	DONE(3, "完了");
	
	private final Integer index;
	private final String text;
	
	private TaskStatus(final Integer index, final String text) {
		this.index = index;
		this.text = text;
	}
	
	public Integer getIndex() {
		return this.index;
	}
	
	public String getText() {
		return this.text;
	}
	
	public static TaskStatus getStatusByIndex(final Integer index) {
		TaskStatus[] taskStatuses = TaskStatus.values();
		for(TaskStatus taskStatus: taskStatuses) {
			if(taskStatus.getIndex() == index) {
				return taskStatus;
			}
		}
		return null;
	}
	
	public static TaskStatus getStatusByText(final String status) {
		TaskStatus[] taskStatuses = TaskStatus.values();
		for(TaskStatus taskStatus: taskStatuses) {
			if(taskStatus.getText().equals(status)) {
				return taskStatus;
			}
		}
		return null;
	}
}
