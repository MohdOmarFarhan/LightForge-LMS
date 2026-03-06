# Database Schema Documentation
# Project: LightForge Academy LMS

This document outlines the relational database structure, specifically focusing on the ID-based relationships between tables.

## 1. Core Academic Structure

### `levels`
Represents the broad educational level (e.g., HSC, SSC). This is the top-level filter.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Level ID |
| `name` | String | "HSC", "SSC" |
| `description` | String | "Higher Secondary Certificate" |

### `subjects`
Represents the subject matter.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Subject ID |
| `name` | String | "Physics", "Chemistry" |
| `code` | String | "PHY", "CHEM" |

### `papers`
Represents specific papers within a subject.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Paper ID |
| `subject_id` | FK | Links to `subjects.id` |
| `name` | String | "1st Paper", "2nd Paper" |
| `code` | String | "174", "175" |

### `chapters`
Represents chapters within a paper.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Chapter ID |
| `paper_id` | FK | Links to `papers.id` |
| `name` | String | "Vectors", "Dynamics" |
| `number` | Int | 1, 2, 3 |

### `modules`
Represents smaller learning units within a chapter.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Module ID |
| `chapter_id` | FK | Links to `chapters.id` |
| `name` | String | "Dot Product", "Cross Product" |
| `number` | Int | 1, 2, 3 |

---

## 2. Content & Assessment

### `questions`
The central pool of questions. Questions are linked to content via IDs, not strings.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Question ID |
| `content` | Text | The question text/stem |
| `type` | String | "mcq", "cq", "descriptive" |
| **`level_id`** | **FK** | Links to `levels.id`. **Replaces Class**. (e.g., A question for HSC level) |
| **`subject_id`** | **FK** | Links to `subjects.id` |
| **`paper_id`** | **FK** | Links to `papers.id` |
| **`chapter_id`** | **FK** | Links to `chapters.id` |
| **`module_id`** | **FK** | Links to `modules.id` (Nullable) |
| `difficulty` | String | "easy", "medium", "hard" |
| `marks` | Int | Marks assigned to this question |

### `exams`
Represents a specific test event.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Exam ID |
| `title` | String | "First Term Exam 2026" |
| **`target_class`** | **Int** | **11** or **12**. Defines the *audience*, not the content source. |
| **`level_id`** | **FK** | Links to `levels.id` (e.g., HSC) |
| **`subject_id`** | **FK** | Links to `subjects.id` (Nullable for Mixed exams) |
| **`paper_id`** | **FK** | Links to `papers.id` (Nullable) |
| `total_marks` | Int | Total marks for the exam |
| `start_time` | DateTime | When the exam becomes available |
| `end_time` | DateTime | When the exam closes |
| `duration_minutes` | Int | Time allowed to take the exam |

### `exam_questions` (Pivot Table)
Links Questions to Exams.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Pivot ID |
| `exam_id` | FK | Links to `exams.id` |
| `question_id` | FK | Links to `questions.id` |
| `order` | Int | 1, 2, 3 (Sequence in the exam) |

---

## 3. Users & Attempts

### `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique User ID |
| `name` | String | User's full name |
| `email` | String | User's email |
| `role` | String | "admin", "student" |
| `class` | Int | 11, 12 (Current academic class of the student) |
| `student_id` | String | Custom Student ID (e.g., "241001") |

### `exam_attempts`
Records a student taking an exam.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Attempt ID |
| `exam_id` | FK | Links to `exams.id` |
| `user_id` | FK | Links to `users.id` |
| `status` | String | "in_progress", "submitted", "graded" |
| `total_score` | Int | Final score obtained |

### `exam_answers`
Records specific answers given by a student.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | PK | Unique Answer ID |
| `exam_attempt_id` | FK | Links to `exam_attempts.id` |
| `question_id` | FK | Links to `questions.id` |
| `answer_text` | Text | Student's answer (or option index for MCQ) |
| `marks_obtained` | Int | Marks awarded for this specific answer |
